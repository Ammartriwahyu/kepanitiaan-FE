<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Models\DaftarKepanitiaan;
use App\Models\Kepanitiaan;

class DaftarKepanitiaanExportController extends Controller
{
    public function export($kepanitiaan_id)
    {
        // 1. Ambil data kepanitiaan untuk nama file
        $kepanitiaan = Kepanitiaan::findOrFail($kepanitiaan_id);
        $namaKepanitiaan = $kepanitiaan->nama;

        // 2. Ambil data pendaftar sesuai kepanitiaan yang dipilih
        $pendaftar = DaftarKepanitiaan::with(['divisiSatu', 'divisiDua'])
                                       ->where('kepanitiaan_id', $kepanitiaan_id)
                                       ->get();

        // 3. Buat objek Spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        
        // 4. Atur style header
        $headerStyle = [
            'font' => ['bold' => true],
            'alignment' => ['horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER],
            'borders' => ['allBorders' => ['borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN]],
        ];
        $sheet->getStyle('A1:I1')->applyFromArray($headerStyle);
        
        // 5. Set header kolom
        $sheet->setCellValue('A1', 'No');
        $sheet->setCellValue('B1', 'Nama');
        $sheet->setCellValue('C1', 'NIM');
        $sheet->setCellValue('D1', 'Prodi');
        $sheet->setCellValue('E1', 'WhatsApp');
        $sheet->setCellValue('F1', 'Pilihan Divisi 1');
        $sheet->setCellValue('G1', 'Pilihan Divisi 2');
        $sheet->setCellValue('H1', 'Link Berkas');
        $sheet->setCellValue('I1', 'Tanggal Daftar');

        // 6. Isi data pendaftar ke dalam baris
        $row = 2;
        foreach ($pendaftar as $index => $data) {
            $sheet->setCellValue('A' . $row, $index + 1);
            $sheet->setCellValue('B' . $row, $data->nama);
            $sheet->setCellValue('C' . $row, $data->nim);
            $sheet->setCellValue('D' . $row, $data->prodi);
            $sheet->setCellValue('E' . $row, $data->whatsapp);
            $sheet->setCellValue('F' . $row, $data->divisiSatu->nama_divisi); // Ambil nama divisi
            $sheet->setCellValue('G' . $row, $data->divisiDua->nama_divisi);  // Ambil nama divisi
            $sheet->setCellValue('H' . $row, $data->link);
            $sheet->setCellValue('I' . $row, Carbon::parse($data->created_at)->format('d F Y, H:i'));
            $row++;
        }
        
        // Atur lebar kolom otomatis
        foreach (range('A', 'I') as $columnID) {
            $sheet->getColumnDimension($columnID)->setAutoSize(true);
        }

        // 7. Simpan sebagai file Excel dan download
        $writer = new Xlsx($spreadsheet);
        
        // Membuat nama file yang dinamis, contoh: "Daftar Pendaftar - Panitia Wisuda.xlsx"
        $fileName = 'Daftar Pendaftar - ' . preg_replace('/[^A-Za-z0-9\-]/', ' ', $namaKepanitiaan) . '.xlsx';
        
        // Mengatur header agar browser mengenali ini sebagai file download
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="' . $fileName . '"');
        header('Cache-Control: max-age=0');
        
        $writer->save('php://output');
    }
}
