import { motion } from "framer-motion";
import { Button } from "@/shared/components/shadcdn/button";

function formatTanggal(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function KegiatanCard({ kegiatan, index = 0, onLihat }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
            className="rounded-2xl shadow-lg overflow-hidden flex flex-col bg-white cursor-pointer"
            style={{ border: "none" }}
        >
            <div className="relative overflow-hidden">
                {kegiatan.gambar ? (
                    <img
                        src={kegiatan.gambar}
                        alt={kegiatan.nama}
                        className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
                    />
                ) : (
                    <div
                        className="w-full h-52 flex items-center justify-center text-white/50 text-sm font-medium"
                        style={{ background: "linear-gradient(135deg, #499496 0%, #026D78 100%)" }}
                    >
                        {kegiatan.nama}
                    </div>
                )}

                {kegiatan.tanggalBuka && (
                    <span
                        className="absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
                        style={{ backgroundColor: "#9ab34c" }}
                    >
                        {formatTanggal(kegiatan.tanggalBuka)}
                    </span>
                )}
            </div>

            <div className="bg-white px-5 pt-4 pb-5 flex flex-col flex-1 gap-3">
                <h3 className="font-bold text-green-4 text-base leading-snug line-clamp-2">
                    {kegiatan.nama}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1 text-justify">
                    {kegiatan.deskripsi ||
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."}
                </p>

                <div className="flex justify-end mt-1">
                    <Button
                        onClick={() => onLihat?.(kegiatan)}
                        className="bg-green-3 hover:bg-green-1 text-white font-semibold rounded-xl px-6"
                    >
                        Lihat Selengkapnya
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
