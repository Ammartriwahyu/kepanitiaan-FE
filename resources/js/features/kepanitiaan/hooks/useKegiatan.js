import { useEffect, useState } from "react";
import axios from "axios";

export function useKegiatan() {
    const [kegiatan, setKegiatan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("/api/v1/kepanitiaan");
                setKegiatan(res.data.data?.kepanitiaans ?? []);
            } catch {
                setError("Gagal memuat data kegiatan.");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return { kegiatan, loading, error };
}