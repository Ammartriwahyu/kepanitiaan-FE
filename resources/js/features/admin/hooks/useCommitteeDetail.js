import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export function useCommitteeDetail(committeeId) {
    const [committee, setCommittee] = useState(null);
    const [registrants, setRegistrants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refresh = useCallback(async () => {
        if (!committeeId) return;

        setLoading(true);
        setError(null);

        try {
            const [detailResponse, registrantResponse] = await Promise.all([
                axios.get(`/api/v1/kepanitiaan/${committeeId}`),
                axios.get(`/api/v1/daftar-kepanitiaan/${committeeId}`),
            ]);

            setCommittee(detailResponse.data.data.kepanitiaan);
            setRegistrants(registrantResponse.data.data.pendaftar ?? []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [committeeId]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const removeRegistrant = useCallback(
        async (registrantId) => {
            await axios.delete(`/api/v1/daftar-kepanitiaan/${registrantId}`);
            await refresh();
        },
        [refresh],
    );

    return {
        committee,
        registrants,
        loading,
        error,
        refresh,
        removeRegistrant,
    };
}
