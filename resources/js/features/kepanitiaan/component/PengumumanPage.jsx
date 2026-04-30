import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function PengumumanPage({ kegiatan, pendaftaran, onBack }) {
    // TODO: Fetch status keterima/ketolak dari API pendaftaran
    // Contoh: const status = pendaftaran?.status; // "diterima" | "ditolak"
    // TODO: Fetch link grup dari API
    // Contoh: const linkGrup = pendaftaran?.link_grup;

    const status = pendaftaran?.status ?? "ditolak"; // placeholder
    const linkGrup = pendaftaran?.link_grup ?? "#"; // TODO: ganti dengan link_grup dari API

    const diterima = status === "diterima";

    return (
        <section className="min-h-[80vh] py-20 px-4 relative overflow-hidden flex items-center">
            {/* Blob decoration kanan atas */}
            <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40"
                style={{
                    background: diterima
                        ? "var(--color-green-3)"
                        : "rgba(180,80,80,0.4)",
                }}
            />
            {/* Blob decoration kiri bawah */}
            <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-30"
                style={{
                    background: "var(--color-green-3)",
                }}
            />

            <div className="relative mx-auto w-full max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
                    className={`rounded-2xl shadow-2xl overflow-hidden`}
                    style={{
                        background: diterima
                            ? "linear-gradient(135deg, #9ab34c 0%, #7a9c3a 100%)"
                            : "linear-gradient(135deg, #b45454 0%, #8b3232 100%)",
                    }}
                >
                    {/* Header */}
                    <div className="py-8 px-8 text-center">
                        <h2 className="text-white-1 font-black text-2xl tracking-widest uppercase">
                            Pengumuman
                        </h2>
                    </div>

                    {/* Content card */}
                    <div className="mx-6 mb-8 bg-white rounded-xl p-7 shadow-inner">
                        {diterima ? (
                            <>
                                <h3 className="text-lg font-bold mb-3">
                                    <span className="text-green-3">Selamat</span>{" "}
                                    <span className="text-green-4">Datang di KBMDSI 2026!</span>
                                </h3>
                                <p className="text-green-4/80 text-sm leading-relaxed mb-6">
                                    Selamat! Kamu dinyatakan telah berhasil melewati seluruh rangkaian
                                    seleksi yang panjang dan ketat. Kami sangat menghargai kerja keras
                                    serta dedikasi yang telah kamu berikan selama proses ini.
                                </p>
                                <div className="flex justify-end">
                                    <a
                                        href={linkGrup}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-green-2 text-white-1 font-semibold px-6 py-3 rounded-lg hover:bg-green-1 transition-colors"
                                    >
                                        Gabung Grup
                                        <ArrowRight className="size-4" />
                                    </a>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold text-green-4 mb-3">
                                    Tetap Semangat, Perjalanan Masih Panjang!
                                </h3>
                                <p className="text-green-4/80 text-sm leading-relaxed mb-4">
                                    Terima kasih telah berbagi semangatmu bersama kami. Kami sangat
                                    terkesan dengan dedikasi yang kamu tunjukkan selama rangkaian
                                    seleksi {kegiatan?.nama ?? "ini"}.
                                </p>
                                <p className="text-green-4/80 text-sm leading-relaxed">
                                    Meski saat ini kita belum bisa bekerja sama, jangan biarkan hal
                                    ini menghentikan langkahmu. Teruslah berkembang, asah potensimu,
                                    dan tetaplah menjadi bagian dari perubahan positif di lingkungan
                                    kampus. Kami bangga sudah mengenalmu!
                                </p>
                            </>
                        )}
                    </div>
                </motion.div>

                <button
                    onClick={onBack}
                    className="mt-5 flex items-center gap-2 text-green-4/60 hover:text-green-4 text-sm transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke detail kegiatan
                </button>
            </div>
        </section>
    );
}