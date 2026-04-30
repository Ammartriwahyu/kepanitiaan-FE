import { useState } from "react";
import axios from "axios";

const EMPTY = { nim: "", password: "" };

export function useLogin() {
    const [form, setForm]       = useState(EMPTY);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    const update = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (error) setError(null);
    };

    const submit = async (kepanitiaanId) => {
        if (!form.nim.trim() || !form.password.trim()) {
            setError("NIM/Email dan kata sandi wajib diisi.");
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(
                `/api/v1/daftar-kepanitiaan/login/${kepanitiaanId}`,
                { username: form.nim.trim(), password: form.password },
            );

            const mahasiswa = res.data?.data?.mahasiswa;

            if (!mahasiswa || mahasiswa.error === true) {
                setError(
                    mahasiswa?.message ||
                    "Login gagal. Pastikan NIM dan kata sandi UB kamu benar."
                );
                return null;
            }

            return mahasiswa;

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

    const reset = () => { setForm(EMPTY); setError(null); };

    return { form, update, submit, loading, error, reset };
}