import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export function useCommittees() {
    const [committees, setCommittees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("/api/v1/kepanitiaan/admin");
            setCommittees(response.data.data.kepanitiaans.data ?? []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        committees,
        setCommittees,
        loading,
        error,
        refresh,
    };
}
