import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FadeUp from "@/shared/animations/FadeUp";

/**
 * Section halaman pengumuman kelulusan.
 * Menampilkan tampilan diterima (hijau) atau ditolak (merah) berdasarkan status_kelulusan.
 *
 * Props:
 *   kegiatan    - object Kepanitiaan { nama, link_grup_whatsapp }
 *   pendaftaran - object DaftarKepanitiaan { status_kelulusan: 'lulus'|'tidak_lulus'|null }
 */
export default function PengumumanSection({ kegiatan, pendaftaran }) {
    const status    = pendaftaran?.status_kelulusan;
    const linkGrup  = kegiatan?.link_grup_whatsapp || "#";

    /* ---- Belum ada data pendaftaran ---- */
    if (!pendaftaran) {
        return (
            <EmptyState
                title="Data Pendaftaran Tidak Ditemukan"
                message="Kami tidak menemukan data pendaftaranmu. Pastikan kamu sudah login dengan akun yang benar."
            />
        );
    }

    /* ---- Status belum ditentukan admin ---- */
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
            className="min-h-screen py-20 px-4 relative overflow-hidden"
            style={{ backgroundColor: "#F2F2F2" }}
        >
            {/* Blob dekorasi top-right */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.65, scale: 1 }}
                transition={{ duration: 0.9 }}
                className="absolute top-0 right-0 w-64 h-64 rounded-3xl pointer-events-none"
                style={{
                    background: "linear-gradient(225deg, #9ab34c, #7ab2b2)",
                    transform: "translate(32%, -32%) rotate(-14deg)",
                }}
            />
            {/* Blob dekorasi bottom-left */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="absolute bottom-0 left-0 w-56 h-56 rounded-3xl pointer-events-none"
                style={{
                    background: "linear-gradient(45deg, #9cd5ff, #9ab34c)",
                    transform: "translate(-32%, 32%) rotate(18deg)",
                }}
            />

            <div className="relative mx-auto max-w-3xl">
                <FadeUp delay={0}>
                    {/* Kartu utama */}
                    <div
                        className="rounded-3xl p-8 md:p-12 shadow-2xl"
                        style={{
                            background: diterima
                                ? "#9ab34c"          /* olive-green untuk diterima */
                                : "#a83232",         /* merah-bata untuk ditolak  */
                        }}
                    >
                        <h1 className="text-white-1 font-bold text-2xl uppercase tracking-widest text-center mb-8">
                            Pengumuman
                        </h1>

                        {/* Kartu putih dalam */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            className="bg-white-1 rounded-2xl p-6 md:p-8 shadow-md"
                        >
                            {diterima ? (
                                /* === DITERIMA === */
                                <>
                                    <h2 className="text-lg md:text-xl font-bold mb-4 leading-snug">
                                        <span className="text-green-3">Selamat </span>
                                        <span className="text-green-4">
                                            Datang di KBMDSI 2026!
                                        </span>
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
                                            className="inline-flex items-center gap-2 bg-green-2 hover:bg-green-4 text-white-1 font-semibold px-6 py-3 rounded-lg transition-colors text-sm shadow"
                                        >
                                            Gabung Grup
                                            <ArrowRight className="size-4" />
                                        </a>
                                    </div>
                                </>
                            ) : (
                                /* === DITOLAK === */
                                <>
                                    <h2 className="text-lg md:text-xl font-bold text-green-4 mb-4 leading-snug">
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

/** Komponen fallback ketika data tidak ada atau pengumuman belum tersedia */
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
