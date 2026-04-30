<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class UbauthService
{
    protected SamlParserService $samlParser;

    protected array $headers = [
        'accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-language' => 'en-US,en;q=0.9,id;q=0.8',
        'cache-control' => 'no-cache',
        'pragma' => 'no-cache',
        'user-agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'referer' => 'https://brone.ub.ac.id/',
    ];

    public function __construct(SamlParserService $samlParser)
    {
        $this->samlParser = $samlParser;
    }

    public function auth(string $username, string $password): array
    {
        try {
            $session = $this->getSession();

            $url = sprintf(
                'https://iam.ub.ac.id/auth/realms/ub/login-actions/authenticate?session_code=%s&execution=%s&client_id=brone.ub.ac.id&tab_id=%s',
                $session['session_code'],
                $session['execution'],
                $session['tab_id']
            );

            $cookie = sprintf(
                'AUTH_SESSION_ID=%s; AUTH_SESSION_ID_LEGACY=%s; KC_RESTART=%s',
                $session['auth_session_id'],
                $session['auth_session_id_legacy'],
                $session['kc_restart']
            );

            $response = Http::withHeaders(array_merge($this->headers, [
                'origin' => 'null', // 🔥 WAJIB
                'content-type' => 'application/x-www-form-urlencoded',
                'cookie' => $cookie,
            ]))
                ->retry(3, 1500)
                ->timeout(10)
                ->asForm()
                ->post($url, [
                    'username' => $username,
                    'password' => $password,
                    'credentialId' => '',
                ]);

            $body = $response->body();

            if (!$response->successful()) {
                throw new \Exception('HTTP error: ' . $response->status());
            }

            if (!str_contains($body, 'SAMLResponse')) {
                if (str_contains($body, 'Invalid username or password')) {
                    throw new \Exception('Username atau password salah');
                }

                Log::error('SAML NOT FOUND', ['body' => $body]);

                throw new \Exception('Login gagal (SAML tidak ditemukan)');
            }

            $saml = $this->getBetween($body, 'name="SAMLResponse" value="', '"/>');

            return $this->samlParser->parse($saml);

        } catch (\Throwable $e) {
            Log::error('UB Auth Error: ' . $e->getMessage());

            return [
                'error' => true,
                'message' => $e->getMessage(),
            ];
        }
    }

    protected function getSession(): array
    {
        $response = Http::withHeaders($this->headers)
            ->retry(3, 1500)
            ->timeout(10)
            ->get('https://brone.ub.ac.id/my/');

        if (!$response->successful()) {
            throw new \Exception('Gagal ambil session');
        }

        $body = $response->body();
        $cookie = implode(';', $response->getHeader('Set-Cookie'));

        return [
            'auth_session_id' => $this->getBetween($cookie, 'AUTH_SESSION_ID=', ';'),
            'auth_session_id_legacy' => $this->getBetween($cookie, 'AUTH_SESSION_ID_LEGACY=', ';'),
            'kc_restart' => $this->getBetween($cookie, 'KC_RESTART=', ';'),
            'session_code' => $this->getBetween($body, 'session_code=', '&amp'),
            'execution' => $this->getBetween($body, 'execution=', '&amp'),
            'tab_id' => explode('tab_id=', $this->getBetween($body, 'action="', '" '))[1]
                ?? throw new \Exception('Tab ID not found'),
        ];
    }

    protected function getBetween(string $text, string $start, string $end): string
    {
        return Str::of($text)->after($start)->before($end)->toString();
    }
}
