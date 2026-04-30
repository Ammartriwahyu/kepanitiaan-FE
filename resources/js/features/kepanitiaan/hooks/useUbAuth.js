import { useState } from "react";
import axios from "axios";

export function useUbAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password, kepanitiaanId) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(
                `/api/v1/daftar-kepanitiaan/login/${kepanitiaanId}`,
                { username, password }
            );
            return { success: true, data: res.data.data };
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Login gagal. Periksa username dan password kamu.";
            setError(msg);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error, setError };
}