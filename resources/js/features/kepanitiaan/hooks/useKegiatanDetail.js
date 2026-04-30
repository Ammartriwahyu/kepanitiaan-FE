import { useCallback, useState } from "react";
import axios from "axios";

export function useKegiatanDetail() {
    const [detail, setDetail] = useState(null);
    const [pendaftar, setPendaftar] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDetail = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`/api/v1/kepanitiaan/${id}`);
            setDetail(res.data.data?.kepanitiaan ?? null);
        } catch {
            setError("Gagal memuat detail kegiatan.");
        } finally {
            setLoading(false);
        }
    }, []);

    const checkRegistered = useCallback(async (kepanitiaanId, nim) => {
        try {
            const res = await axios.get(`/api/v1/daftar-kepanitiaan/${kepanitiaanId}`);
            const list = res.data.data?.pendaftar ?? [];
            return list.find((p) => p.nim === nim) ?? null;
        } catch {
            return null;
        }
    }, []);

    return { detail, pendaftar, loading, error, fetchDetail, checkRegistered };
}