import { useState, useEffect } from "react";

function calcTime(target) {
    if (!target) return { hari: 0, jam: 0, menit: 0, detik: 0, selesai: false };
    const diff = Math.max(0, new Date(target) - new Date());
    return {
        hari:   Math.floor(diff / (1000 * 60 * 60 * 24)),
        jam:    Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        menit:  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        detik:  Math.floor((diff % (1000 * 60)) / 1000),
        selesai: diff === 0,
    };
}

/**
 * .
 * @param {string|null} targetDate - ISO date string
 * @returns {{ hari, jam, menit, detik, selesai }}
 */
export function useCountdown(targetDate) {
    const [time, setTime] = useState(() => calcTime(targetDate));

    useEffect(() => {
        if (!targetDate) return;
        setTime(calcTime(targetDate));

        const interval = setInterval(() => {
            const t = calcTime(targetDate);
            setTime(t);
            if (t.selesai) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return time;
}
