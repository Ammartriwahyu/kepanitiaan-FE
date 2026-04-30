import { useMemo, useState } from "react";

export function useAspirasiSearch(aspirations) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        if (!q) return aspirations;

        return aspirations.filter(
            (a) =>
                a.pesan_aspirasi?.toLowerCase().includes(q) ||
                a.tujuan_aspirasi?.toLowerCase().includes(q) ||
                (a.nama_pengirim
                    ? a.nama_pengirim.toLowerCase().includes(q)
                    : "anonim".includes(q)),
        );
    }, [aspirations, search]);

    return { search, setSearch, filtered };
}