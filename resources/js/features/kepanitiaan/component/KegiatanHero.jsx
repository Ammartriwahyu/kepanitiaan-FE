import { motion } from "framer-motion";
import { Button } from "@/shared/components/shadcdn/button";
import { CheckCircle2 } from "lucide-react";

export default function KegiatanHero({
    kegiatan,
    sudahDaftar,
    pengumumanSudahTiba,
    onDaftar,
    onPengumuman,
}) {
    return (
        <section className="py-16 px-4">
            <div className="mx-auto max-w-5xl">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-green-1/10"
                    >
                        {kegiatan?.gambar ? (
                            <img
                                src={kegiatan.gambar}
                                alt={kegiatan.nama}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-3/20 to-green-2/20">
                                <span className="text-green-4/30 text-sm">No Image</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <h1 className="text-green-4 font-bold text-3xl md:text-4xl leading-tight">
                            {kegiatan?.nama}
                        </h1>
                        <p className="text-green-4/80 text-base leading-relaxed">
                            {kegiatan?.deskripsi ||
                                "Mulai langkah pertamamu di dunia organisasi bareng KBMDSI!"}
                        </p>
                        {kegiatan?.deskripsi2 && (
                            <p className="text-green-4/80 text-base leading-relaxed">
                                {kegiatan.deskripsi2}
                            </p>
                        )}

                        {/* Badge sudah daftar (hanya muncul jika sudah daftar) */}
                        {sudahDaftar && !pengumumanSudahTiba && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 bg-green-3/10 border border-green-3/40 rounded-full px-4 py-1.5"
                            >
                                <CheckCircle2 className="size-4 text-green-3" />
                                <span className="text-green-3 text-sm font-semibold">
                                    Pendaftaran Berhasil
                                </span>
                            </motion.div>
                        )}

                        {/* CTA Button */}
                        {pengumumanSudahTiba ? (
                            <Button
                                onClick={onPengumuman}
                                className="bg-green-3 hover:bg-green-1 text-white-1 font-semibold px-8 py-3"
                            >
                                Pengumuman
                            </Button>
                        ) : (
                            <Button
                                onClick={!sudahDaftar ? onDaftar : undefined}
                                disabled={sudahDaftar}
                                className={`font-semibold px-8 py-3 ${
                                    sudahDaftar
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                                        : "bg-green-3 hover:bg-green-1 text-white-1"
                                }`}
                            >
                                Daftar Sekarang
                            </Button>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}