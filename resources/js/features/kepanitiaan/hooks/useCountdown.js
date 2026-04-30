import { useEffect, useState } from "react";

function calcTime(target) {
    const diff = Math.max(0, new Date(target) - new Date());
    return {
        hari: Math.floor(diff / (1000 * 60 * 60 * 24)),
        jam: Math.floor((diff / (1000 * 60 * 60)) % 24),
        menit: Math.floor((diff / (1000 * 60)) % 60),
        detik: Math.floor((diff / 1000) % 60),
        selesai: diff === 0,
    };
}

export function useCountdown(targetDate) {
    const [time, setTime] = useState(() => calcTime(targetDate));

    useEffect(() => {
        if (!targetDate) return;
        const interval = setInterval(() => {
            const t = calcTime(targetDate);
            setTime(t);
            if (t.selesai) clearInterval(interval);
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return time;
}