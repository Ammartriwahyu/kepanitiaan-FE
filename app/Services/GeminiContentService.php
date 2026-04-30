<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiContentService
{

    public function censorText($text)
    {
        try {
            // 1. Deteksi bad words use gemini
            $detectionResult = $this->detectBadWords($text);

            //2. If content isn't clean, replace flagged wors with ***
            $censoredText = $text;
            $flaggedWords = $detectionResult['flagged_words'] ?? [];

            if (!empty($flaggedWords)) {
                foreach ($flaggedWords as $word) {
                    $replacement = str_repeat('*', strlen($word));
                    $censoredText = preg_replace(
                        '/\b' . preg_quote($word, '/') . '\b/i',
                        $replacement,
                        $censoredText
                    );
                }
            }

            return [
                'original' => $text,
                'censored' => $censoredText,
                'flagged_words' => $flaggedWords,
                'is_flagged' => !empty($flaggedWords),
                'severity' => $detectionResult['severity'] ?? 'low'
            ];
        } catch (\Exception $e) {
            // if error, return original text (no censor)
            return [
                'original' => $text,
                'censored' => $text,
                'flagged_words' => [],
                'is_flagged' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    public function detectBadWords($text)
    {
        try {
            $apiKey = config('services.gemini.api_key');
            if (!$apiKey) {
                throw new \Exception('Gemini API key is missing in configuration');
            }

            $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

            $response = Http::withHeaders([
                'x-goog-api-key' => $apiKey,
                'Content-Type' => 'application/json'
            ])->timeout(30)->post($url, [
                'generationConfig' => [
                    'responseMimeType' => 'application/json',
                ],
                'contents' => [
                    [
                        'parts' => [
                            [
                                'text' => $this->buildPrompt($text)
                            ]
                        ]
                    ]
                ]
            ]);

            if ($response->failed()) {
                Log::error('Gemini API failed', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return $this->getDefaultResponse(true, 'API Error');
            }

            $result = $this->parseGeminiResponse($response->json());
            Log::debug('Detection result', $result);

            return $result;
        } catch (\Exception $e) {
            Log::error('Exception in detectBadWords', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->getDefaultResponse(true, $e->getMessage());
        }
    }

    private function buildPrompt($text)
    {
        return <<<PROMPT
Anda adalah sistem moderasi konten otomatis. 
Tugas Anda: Deteksi apakah teks Bahasa Indonesia berikut mengandung kata-kata kasar, makian, umpatan, atau konten ofensif.

TEKS YANG AKAN DIANALISIS:
"$text"

INSTRUKSI:
- Ekstrak semua kata yang tergolong makian atau kata kasar.
- Jawab HANYA menggunakan format JSON, tanpa teks awalan atau akhiran.

FORMAT JSON HARAP SEPERTI INI:
{
    "flagged_words": ["kata_kasar_1", "kata_kasar_2"],
    "is_clean": false,
    "severity": "high"
}
PROMPT;
    }

    private function parseGeminiResponse($geminiResponse)
    {
        try {
            // Extract text dari Gemini response
            if (!isset($geminiResponse['candidates'][0]['content']['parts'][0]['text'])) {
                Log::warning('Gemini response invalid format', $geminiResponse);
                return $this->getDefaultResponse(true, 'Invalid response format');
            }

            $extractedText = $geminiResponse['candidates'][0]['content']['parts'][0]['text'];

            // Log untuk debugging
            Log::debug('Gemini extracted text:', ['text' => $extractedText]);

            // Try parse JSON
            $parsed = json_decode($extractedText, true);

            if ($parsed === null) {
                // Mungkin ada teks tambahan, coba extract JSON dari string
                if (preg_match('/{.*}/s', $extractedText, $matches)) {
                    $parsed = json_decode($matches[0], true);
                }

                if ($parsed === null) {
                    Log::warning('Failed to parse JSON from Gemini', ['text' => $extractedText]);
                    return $this->getDefaultResponse(true, 'JSON parse error');
                }
            }

            // Validate response structure
            if (!isset($parsed['flagged_words'])) {
                $parsed['flagged_words'] = [];
            }
            if (!isset($parsed['is_clean'])) {
                $parsed['is_clean'] = empty($parsed['flagged_words']);
            }
            if (!isset($parsed['severity'])) {
                $parsed['severity'] = 'low';
            }

            Log::debug('Parsed response', $parsed);

            return $parsed;
        } catch (\Exception $e) {
            Log::error('Exception in parseGeminiResponse', ['error' => $e->getMessage()]);
            return $this->getDefaultResponse(true, $e->getMessage());
        }
    }

    private function getDefaultResponse($isClean = true, $reason = '')
    {
        return [
            'is_clean' => $isClean,
            'severity' => 'low',
            'flagged_words' => [],
            'reason' => $reason
        ];
    }
}
