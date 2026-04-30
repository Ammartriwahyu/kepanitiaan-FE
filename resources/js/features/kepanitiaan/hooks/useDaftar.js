import { useState } from "react";
import axios from "axios";

/**
 * Hook pendaftaran kepanitiaan.
 * Setelah berhasil mendaftar, simpan flag ke sessionStorage
 * agar Detail.jsx bisa langsung menampilkan state "sudah daftar"
 * tanpa menunggu API (mengatasi race condition / format NIM mismatch).
 */
export function useDaftar(mahasiswa) {
    const [form, setForm] = useState({
        nama:                   mahasiswa?.full_name    ?? "",
        nim:                    mahasiswa?.nim          ?? "",
        prodi:                  mahasiswa?.study_program ?? "",
        whatsapp:               "",
        link:                   "",
        divisi_pilihan_satu_id: "",
        divisi_pilihan_dua_id:  "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    const update = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (error) setError(null);
    };

    /**
     * @param {number|string} kepanitiaanId
     * @returns {boolean} true jika berhasil
     */
    const submit = async (kepanitiaanId) => {
        setLoading(true);
        setError(null);

        try {
            await axios.post("/api/v1/daftar-kepanitiaan", {
                ...form,
                kepanitiaan_id: kepanitiaanId,
            });

            // Simpan flag ke sessionStorage agar Detail.jsx tahu user sudah daftar
            // Key: kepanitiaan_daftar_{id}, Value: NIM user
            sessionStorage.setItem(
                `kepanitiaan_daftar_${kepanitiaanId}`,
                String(form.nim).trim(),
            );

            return true;
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Gagal mendaftar. Silakan coba lagi.";
            setError(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { form, update, submit, loading, error };
}
