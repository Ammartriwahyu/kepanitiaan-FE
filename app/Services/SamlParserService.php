<?php

namespace App\Services;

class SamlParserService
{
    public function parse(string $saml): array
    {
        $decoded = base64_decode($saml);

        try {
            $xml = new \SimpleXMLElement($decoded);
        } catch (\Exception $e) {
            throw new \Exception("XML parse error: " . $e->getMessage());
        }

        $attributes = $xml->xpath('//*[local-name()="Attribute"]');

        $data = [
            'nim' => null,
            'email' => null,
            'full_name' => null,
            'faculty' => null,
            'study_program' => null,
        ];

        foreach ($attributes as $attribute) {
            $name = (string) $attribute['Name'];

            $valueNode = $attribute->xpath('./*[local-name()="AttributeValue"]');
            $value = $valueNode ? (string) $valueNode[0] : null;

            switch ($name) {
                case 'nim':
                case 'NIM':
                    $data['nim'] = $value;
                    break;

                case 'email':
                case 'mail':
                    $data['email'] = $value;
                    break;

                case 'fullName':
                case 'displayName':
                case 'cn':
                    $data['full_name'] = ucwords(strtolower($value));
                    break;

                case 'fakultas':
                case 'faculty':
                    $data['faculty'] = 'Fakultas ' . $value;
                    break;

                case 'prodi':
                case 'studyProgram':
                    $data['study_program'] = $value;
                    break;
            }
        }

        if (!empty($data['nim']) && strlen($data['nim']) >= 2) {
            $prefix = substr($data['nim'], 0, 2);

            $data['siakad_photo_url'] =
                "https://siakad.ub.ac.id/dirfoto/foto/foto_20{$prefix}/{$data['nim']}.jpg";

            $data['file_filkom_photo_url'] =
                "https://file-filkom.ub.ac.id/fileupload/assets/foto/20{$prefix}/{$data['nim']}.png";
        }

        return $data;
    }
}
