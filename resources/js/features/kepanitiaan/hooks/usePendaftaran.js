import { useState } from "react";
import axios from "axios";

const EMPTY = {
    nama: "",
    nim: "",
    prodi: "",
    pilsatu: "",
    pildua: "",
    whatsapp: "",
    link: "",
};

export function usePendaftaran() {
    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const update = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (error) setError(null);
    };

    const submit = async (kepanitiaanId, divisiSatuId, divisiDuaId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await axios.post("/api/v1/daftar-kepanitiaan", {
                nama: form.nama,
                nim: form.nim,
                prodi: form.prodi,
                whatsapp: form.whatsapp,
                link: form.link,
                kepanitiaan_id: kepanitiaanId,
                divisi_pilihan_satu_id: divisiSatuId,
                divisi_pilihan_dua_id: divisiDuaId,
            });
            setSuccess(true);
            setForm(EMPTY);
            return true;
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Pendaftaran gagal. Silakan coba lagi.";
            setError(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { form, update, submit, loading, error, success };
}