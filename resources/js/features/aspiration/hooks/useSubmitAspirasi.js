import { useState } from "react";
import axios from "axios";

const EMPTY_FORM = {
    nama_pengirim: "",
    tujuan_aspirasi: "",
    pesan_aspirasi: "",
};

export function useSubmitAspirasi() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const update = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (success) setSuccess(false);
        if (error) setError(null);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!form.tujuan_aspirasi.trim() || !form.pesan_aspirasi.trim()) return;

        setSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.post("/api/v1/aspiration", form);
            setSuccess(true);
            setForm(EMPTY_FORM);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                "Gagal mengirim aspirasi. Silakan coba lagi.";
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    return { form, update, submit, submitting, success, error };
}