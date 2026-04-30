import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useCountdown } from "@/features/kepanitiaan/hooks/useCountdown";

/** Satu kotak angka countdown (misal: 10 HARI) */
function CountUnit({ value, label }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <motion.div
                key={value}
                initial={{ scale: 0.85, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white-1/20 rounded-xl w-16 md:w-20 py-4 text-center shadow-inner"
            >
                <span className="text-3xl md:text-4xl font-bold text-green-7 leading-none">
                    {String(value).padStart(2, "0")}
                </span>
            </motion.div>
            <span className="text-white-1/70 text-[11px] font-bold tracking-widest uppercase">
                {label}
            </span>
        </div>
    );
}

/**
 * Section countdown menanti pengumuman.
 * Tampil hanya ketika user sudah daftar dan ada tanggal_pengumuman.
 *
 * Props:
 *   kegiatan            - object Kepanitiaan (butuh .nama dan .tanggal_pengumuman)
 *   sudahDaftar         - boolean  → tampilkan badge "Pendaftaran Berhasil"
 *   pengumumanSudahTiba - boolean  → sembunyikan badge saat countdown 0
 */
export default function CountdownSection({ kegiatan, sudahDaftar = false, pengumumanSudahTiba = false }) {
    const { hari, jam, menit, detik } = useCountdown(kegiatan?.tanggal_pengumuman);

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative w-full bg-green-2 py-16 px-4 overflow-hidden"
        >
            {/* Blob dekorasi sudut */}
            <div
                className="absolute top-0 right-0 w-44 h-44 rounded-3xl opacity-30 pointer-events-none"
                style={{
                    background: "linear-gradient(225deg, #9ab34c, #026D78)",
                    transform: "translate(35%, -35%) rotate(-15deg)",
                }}
            />
            <div
                className="absolute bottom-0 left-0 w-44 h-44 rounded-3xl opacity-25 pointer-events-none"
                style={{
                    background: "linear-gradient(45deg, #9cd5ff, #026D78)",
                    transform: "translate(-35%, 35%) rotate(20deg)",
                }}
            />

            <div className="relative mx-auto max-w-2xl text-center">

                {/* Nama kegiatan */}
                <h2 className="text-white-1 font-bold text-2xl md:text-3xl mb-3">
                    {kegiatan?.nama}
                </h2>

                {/* Badge pendaftaran berhasil */}
                <AnimatePresence>
                    {sudahDaftar && !pengumumanSudahTiba && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.7, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 bg-white-1/10 border border-green-3/60 rounded-full px-4 py-1.5 mb-4"
                        >
                            <CheckCircle2 className="size-4 text-green-3 shrink-0" />
                            <span className="text-green-3 text-sm font-semibold">
                                Pendaftaran Berhasil
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Subtitle */}
                <p className="text-green-7 font-semibold text-lg mb-1">
                    Menanti Pengumuman
                </p>
                <p className="text-white-1/65 text-sm leading-relaxed mb-8">
                    Kamu telah berhasil mendaftar sebagai{" "}
                    <strong className="text-white-1 font-semibold">
                        Calon {kegiatan?.nama}
                    </strong>
                    . Silakan kembali lagi nanti untuk melihat hasil seleksi.
                </p>

                {/* Kotak countdown */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="bg-white-1 rounded-2xl p-6 md:p-8 shadow-xl"
                >
                    <p className="text-green-2 font-bold text-sm uppercase tracking-widest mb-1">
                        Pengumuman Akan Hadir Dalam
                    </p>
                    <div className="h-px bg-green-2/20 w-full my-4" />
                    <div className="flex items-start justify-center gap-4 md:gap-8">
                        <CountUnit value={hari}  label="Hari"   />
                        <CountUnit value={jam}   label="Jam"    />
                        <CountUnit value={menit} label="Menit"  />
                        <CountUnit value={detik} label="Detik"  />
                    </div>
                </motion.div>

                <p className="text-white-1/35 text-xs mt-6 leading-relaxed">
                    Pantau terus media sosial kami untuk informasi terbaru.<br />
                    Jadwal pengumuman dapat berubah sewaktu-waktu.
                </p>
            </div>
        </motion.section>
    );
}
