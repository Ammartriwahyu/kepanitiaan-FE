import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { useCountdown } from "@/features/kepanitiaan/hooks/useCountdown";
import kelopakDaun from "@/assets/icons/kepanitiaan/kelopakDaun.webp";

function CountUnit({ value, label }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <motion.div
                key={value}
                initial={{ scale: 0.85, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white/20 rounded-xl w-16 md:w-20 py-4 text-center shadow-inner"
            >
                <span className="text-3xl md:text-4xl font-bold text-green-7 leading-none">
                    {String(value).padStart(2, "0")}
                </span>
            </motion.div>
            <span className="text-white/70 text-[11px] font-bold tracking-widest uppercase">
                {label}
            </span>
        </div>
    );
}

export default function CountdownSection({ kegiatan, sudahDaftar = false, pengumumanSudahTiba = false }) {
    const adaTanggal = !!kegiatan?.tanggal_pengumuman;
    const { hari, jam, menit, detik } = useCountdown(kegiatan?.tanggal_pengumuman ?? null);

    return (
        <section
            className="w-full py-16 px-4"
            style={{ backgroundColor: " #DFE8E9;" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative mx-auto max-w-3xl"
            >
                <motion.img
                    src={kelopakDaun}
                    alt="" aria-hidden="true"
                    className="hidden md:block absolute pointer-events-none select-none"
                    style={{
                        width: 140, height: 165,
                        top: -30, right: -20,
                        zIndex: 0,
                    }}
                    initial={{ opacity: 0, x: 20, y: -20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                />
                <motion.img
                    src={kelopakDaun}
                    alt="" aria-hidden="true"
                    className="hidden md:block absolute pointer-events-none select-none"
                    style={{
                        width: 130, height: 155,
                        bottom: -30, left: -20,
                        scaleY: -1,
                        scaleX: -1,
                        zIndex: 0,
                    }}
                    initial={{ opacity: 0, x: -20, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                />

                <div
                    className="relative rounded-3xl px-8 py-12 text-center overflow-hidden"
                    style={{ backgroundColor: "#026D78", zIndex: 1 }}
                >
                    {/* Nama kegiatan */}
                    <h2 className="text-white font-bold text-2xl md:text-3xl mb-3">
                        {kegiatan?.nama}
                    </h2>

                    <AnimatePresence>
                        {sudahDaftar && !pengumumanSudahTiba && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.7, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="inline-flex items-center gap-2 border border-yellow-400/60 rounded-full px-4 py-1.5 mb-5"
                                style={{ backgroundColor: "#F4F9E3" }}
                            >
                                <CheckCircle2 className="size-4 shrink-0" style={{ color: "#748936" }} />
                                <span className="text-sm font-semibold" style={{ color: "#748936" }}>
                                    Pendaftaran Berhasil
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Subtitle */}
                    <p className="text-white font-semibold text-lg mb-1">Menanti Pengumuman</p>
                    <p className="text-white/65 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                        Kamu telah berhasil mendaftar sebagai{" "}
                        <strong className="text-white font-bold">Calon {kegiatan?.nama}</strong>.
                        {" "}Silakan kembali lagi nanti untuk melihat hasil seleksi.
                    </p>

                    {/* Kotak countdown inner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="bg-white rounded-2xl p-6 md:p-8 shadow-xl mb-6"
                    >
                        {adaTanggal ? (
                            <>
                                <p className="text-green-2 font-bold text-sm uppercase tracking-widest mb-1">
                                    Pengumuman Akan Hadir Dalam
                                </p>
                                <div className="h-px bg-green-2/20 w-full my-4" />
                                <div className="flex items-start justify-center gap-4 md:gap-8">
                                    <CountUnit value={hari} label="Hari" />
                                    <CountUnit value={jam} label="Jam" />
                                    <CountUnit value={menit} label="Menit" />
                                    <CountUnit value={detik} label="Detik" />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <Clock className="size-8 text-green-2/40" />
                                <p className="text-green-2 font-bold text-sm uppercase tracking-widest">
                                    Pengumuman Akan Hadir Dalam
                                </p>
                                <div className="h-px bg-green-2/20 w-full" />
                                <p className="text-gray-400 text-sm">
                                    Jadwal pengumuman belum ditentukan. Pantau terus media sosial kami.
                                </p>
                            </div>
                        )}
                    </motion.div>

                    <p className="text-white/35 text-xs leading-relaxed">
                        Pantau terus media sosial kami untuk informasi terbaru.
                        Jadwal pengumuman dapat berubah sewaktu-waktu.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}