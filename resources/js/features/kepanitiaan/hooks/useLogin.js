import { useState } from "react";
import axios from "axios";

const EMPTY = { nim: "", password: "" };

/**
 * Validasi format akun UB:
 *  - NIM : hanya angka, minimal 10 digit (UB NIM bisa 15–18 digit tergantung angkatan)
 *  - Email: domain @ub.ac.id atau @student.ub.ac.id
 */
function isUbAccount(value) {
    const trimmed = value.trim();
    const isNim   = /^\d{10,18}$/.test(trimmed);
    const isEmail = /^[^\s@]+@(student\.)?ub\.ac\.id$/i.test(trimmed);
    return isNim || isEmail;
}

/**
 * Hook login UB SSO untuk kepanitiaan.
 *
 * BUG FIX KRITIS:
 *   UbauthService::auth() tidak throw exception saat password salah —
 *   ia return { error: true, message: "..." } sebagai array PHP.
 *   Backend tetap return HTTP 200 dengan mahasiswa = { error: true, message: "..." }.
 *   Kita wajib cek `mahasiswa.error === true` dan `mahasiswa.nim` ada.
 */
export function useLogin() {
    const [form, setForm]     = useState(EMPTY);
    const [loading, setLoading] = useState(false);
    const [error, setError]   = useState(null);

    const update = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (error) setError(null);
    };

    /**
     * @param {number|string} kepanitiaanId
     * @returns {object|null} mahasiswa data jika berhasil, null jika gagal
     */
    const submit = async (kepanitiaanId) => {
        const nimVal  = form.nim.trim();
        const passVal = form.password.trim();

        if (!nimVal || !passVal) {
            setError("NIM/Email dan kata sandi wajib diisi.");
            return null;
        }

        // Validasi format: harus akun UB
        if (!isUbAccount(nimVal)) {
            setError("Masukkan NIM UB (contoh: 235150701111001) atau email @ub.ac.id.");
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(
                `/api/v1/daftar-kepanitiaan/login/${kepanitiaanId}`,
                { username: nimVal, password: form.password },
            );

            const mahasiswa = res.data?.data?.mahasiswa;

            // ============================================================
            // KUNCI FIX: UbauthService return { error: true, message: "..." }
            // saat auth gagal (password salah, dsb.) — backend tetap 200.
            // Kita harus cek property ini secara eksplisit.
            // ============================================================
            if (!mahasiswa || mahasiswa.error === true || !mahasiswa.nim) {
                const msg =
                    mahasiswa?.message ||
                    "Login gagal. Pastikan NIM dan kata sandi UB kamu benar.";
                setError(msg);
                return null;
            }

            return mahasiswa; // { nim, full_name, study_program, email, faculty, ... }
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Login gagal. Pastikan NIM dan kata sandi UB kamu benar.";
            setError(msg);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setForm(EMPTY);
        setError(null);
    };

    return { form, update, submit, loading, error, reset };
}
