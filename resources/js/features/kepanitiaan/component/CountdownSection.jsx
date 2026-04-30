import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";

function TimeBox({ value, label }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <motion.div
                key={value}
                initial={{ scale: 1.15, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white-1/10 backdrop-blur-sm rounded-xl w-20 h-20 flex items-center justify-center shadow-inner"
            >
                <span className="text-green-7 font-bold text-4xl tabular-nums">
                    {String(value).padStart(2, "0")}
                </span>
            </motion.div>
            <span className="text-white-1/70 text-xs font-semibold uppercase tracking-widest">
                {label}
            </span>
        </div>
    );
}

export default function CountdownSection({ targetDate, kegiatan }) {
    const { hari, jam, menit, detik } = useCountdown(targetDate);

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative py-16 px-4 overflow-hidden"
            style={{ background: "var(--color-green-1)" }}
        >
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-green-3/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-green-7/20 blur-2xl pointer-events-none" />

            <div className="relative mx-auto max-w-2xl text-center">
                <h2 className="text-white-1 font-bold text-2xl md:text-3xl mb-3">
                    {kegiatan?.nama}
                </h2>
                <p className="text-green-7 font-semibold mb-1">Menanti Pengumuman</p>
                <p className="text-white-1/70 text-sm mb-8">
                    Kamu telah berhasil mendaftar sebagai{" "}
                    <strong className="text-white-1">Calon {kegiatan?.nama}</strong>. Silakan
                    kembali lagi nanti untuk melihat hasil seleksi.
                </p>

                <div className="bg-white-1/5 border border-white-1/10 rounded-2xl p-6 mb-6">
                    <p className="text-green-3 font-bold text-xs uppercase tracking-widest mb-5">
                        Pengumuman Akan Hadir Dalam
                    </p>
                    <div className="flex items-start justify-center gap-4 md:gap-6 flex-wrap">
                        <TimeBox value={hari} label="Hari" />
                        <TimeBox value={jam} label="Jam" />
                        <TimeBox value={menit} label="Menit" />
                        <TimeBox value={detik} label="Detik" />
                    </div>
                </div>

                <p className="text-white-1/40 text-xs">
                    Pantau terus media sosial kami untuk informasi terbaru. Jadwal pengumuman
                    dapat berubah sewaktu-waktu.
                </p>
            </div>
        </motion.section>
    );
}