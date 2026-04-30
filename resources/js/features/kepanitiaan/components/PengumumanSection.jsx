import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/shared/animations/FadeUp";
import kelopakDaun from "@/assets/icons/kepanitiaan/kelopakDaun.webp";

export default function PengumumanSection({ kegiatan, pendaftaran }) {
    const status = pendaftaran?.status_kelulusan;
    const linkGrup = kegiatan?.link_grup_whatsapp || "#";

    if (!pendaftaran) {
        return (
            <EmptyState
                title="Data Pendaftaran Tidak Ditemukan"
                message="Kami tidak menemukan data pendaftaranmu. Pastikan kamu sudah login dengan akun yang benar."
            />
        );
    }

    if (status === null || status === undefined) {
        return (
            <EmptyState
                title="Pengumuman Belum Tersedia"
                message="Pengumuman akan segera diumumkan oleh panitia. Pantau terus media sosial kami."
            />
        );
    }

    const diterima = status === "lulus";

    return (
        <section
            className="py-20 px-4 relative overflow-hidden"
            style={{ backgroundColor: "#F2F2F2" }}
        >
            <motion.img
                src={kelopakDaun}
                alt="" aria-hidden="true"
                className="hidden md:block absolute pointer-events-none select-none"
                style={{
                    width: 200, height: 230,
                    top: 0, right: 0,
                    zIndex: 0,
                    transformOrigin: "top right",
                }}
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            />

            <motion.img
                src={kelopakDaun}
                alt="" aria-hidden="true"
                className="hidden md:block absolute pointer-events-none select-none"
                style={{
                    width: 180, height: 210,
                    bottom: 0, left: 0,
                    scaleY: -1,
                    scaleX: -1,
                    zIndex: 0,
                    transformOrigin: "bottom left",
                }}
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            />

            <div className="relative mx-auto max-w-3xl" style={{ zIndex: 1 }}>
                <FadeUp delay={0}>
                    <div
                        className="rounded-3xl px-8 pt-10 pb-10 md:px-14 md:pt-12 md:pb-12 shadow-2xl"
                        style={{ background: diterima ? "#9ab34c" : "#a83232" }}
                    >
                        <h1 className="text-white font-bold text-2xl uppercase tracking-widest text-center mb-8">
                            Pengumuman
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-md"
                        >
                            {diterima ? (

                                <>
                                    <h2 className="text-lg md:text-xl font-bold mb-4 leading-snug">
                                        <span style={{ color: "#9ab34c" }}>Selamat </span>
                                        <span className="text-green-4">Datang di KBMDSI 2026!</span>
                                    </h2>
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                                        Selamat! Kamu dinyatakan telah berhasil melewati seluruh
                                        rangkaian seleksi yang panjang dan ketat. Kami sangat
                                        menghargai kerja keras serta dedikasi yang telah kamu
                                        berikan selama proses ini.
                                    </p>
                                    <div className="flex justify-end">
                                        <a
                                            href={linkGrup}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-colors text-sm shadow text-white"
                                            style={{ backgroundColor: "#026D78" }}
                                        >
                                            Gabung Grup
                                            <ArrowRight className="size-4" />
                                        </a>
                                    </div>
                                </>
                            ) : (

                                <>
                                    <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 leading-snug">
                                        Tetap Semangat, Perjalanan Masih Panjang!
                                    </h2>
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                                        Terima kasih telah berbagi semangatmu bersama kami. Kami
                                        sangat terkesan dengan dedikasi yang kamu tunjukkan selama
                                        rangkaian seleksi ini.
                                    </p>
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                        Meski saat ini kita belum bisa bekerja sama, jangan biarkan
                                        hal ini menghentikan langkahmu. Teruslah berkembang, asah
                                        potensimu, dan tetaplah menjadi bagian dari perubahan
                                        positif di lingkungan kampus. Kami bangga sudah mengenalmu!
                                    </p>
                                </>
                            )}
                        </motion.div>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}

function EmptyState({ title, message }) {
    return (
        <section
            className="min-h-screen py-20 px-4 flex items-center justify-center"
            style={{ backgroundColor: "#F2F2F2" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-sm"
            >
                <p className="text-xl font-bold text-green-4 mb-2">{title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
            </motion.div>
        </section>
    );
}