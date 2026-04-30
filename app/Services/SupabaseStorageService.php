<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SupabaseStorageService
{
    protected string $baseUrl;
    protected string $bucket;
    protected string $serviceKey;

    public function __construct()
    {
        $this->baseUrl = rtrim(env('SUPABASE_URL'), '/');
        $this->bucket = env('SUPABASE_BUCKET');
        $this->serviceKey = env('SUPABASE_SERVICE_ROLE');
    }

    /**
     * Upload file ke Supabase Storage
     */
   public function upload(UploadedFile $file, ?string $pathPrefix = ''): ?string
    {
        try {
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = ($pathPrefix ? trim($pathPrefix, '/') . '/' : '') . $fileName;

            $fileContent = file_get_contents($file->getRealPath());
            $url = "{$this->baseUrl}/storage/v1/object/{$this->bucket}/{$path}?upsert=true";

            $response = Http::withHeaders([
                    'apikey' => $this->serviceKey,
                    'Authorization' => 'Bearer ' . $this->serviceKey,
                    'Content-Type' => $file->getMimeType(),
                ])
                ->timeout(60)
                ->connectTimeout(20)
                ->send('PUT', $url, [
                    'body' => $fileContent,
                ]);

            if (!$response->successful()) {
                Log::error('Supabase upload failed', [
                    'upload_url' => $url,
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'json' => $response->json(),
                ]);

                return null; 
            }

            return "{$this->baseUrl}/storage/v1/object/public/{$this->bucket}/{$path}";

        } catch (\Throwable $e) {
            Log::error('Supabase upload exception', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return null;
        }
    }

    /**
     * Hapus file dari Supabase Storage
     */
   public function delete(string $fileUrl): bool
    {
        if (empty($fileUrl)) return false;

        $relativePath = preg_replace(
            "#^{$this->baseUrl}/storage/v1/object/public/{$this->bucket}/#",
            '',
            $fileUrl
        );

        $url = "{$this->baseUrl}/storage/v1/object/{$this->bucket}/{$relativePath}";

        try {
            $response = Http::withHeaders([
                'apikey' => $this->serviceKey,
                'Authorization' => 'Bearer ' . $this->serviceKey,
            ])->delete($url);

            if (!$response->successful()) {
                Log::warning('Supabase delete failed', [
                    'url' => $url,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return false;
            }

            return $response->successful();
        } catch (\Throwable $e) {
            Log::error('Supabase delete exception', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            return false;
        }
    }
}
