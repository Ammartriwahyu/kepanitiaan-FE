import { motion } from "framer-motion";
import { Button } from "@/shared/components/shadcdn/button";
import { CalendarDays } from "lucide-react";

function formatDate(iso) {
    if (!iso) return "-";
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function KegiatanCard({ kegiatan, index, onLihat }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
        >
            {/* Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-green-1/10">
                {kegiatan.gambar ? (
                    <img
                        src={kegiatan.gambar}
                        alt={kegiatan.nama}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-3/20 to-green-2/20">
                        <span className="text-green-4/40 text-sm">No Image</span>
                    </div>
                )}
                {/* Date badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-green-3 text-white-1 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <CalendarDays className="size-3" />
                        {formatDate(kegiatan.tanggalBuka)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-green-4 font-bold text-lg leading-tight line-clamp-2">
                    {kegiatan.nama}
                </h3>
                <p className="text-green-4/70 text-sm leading-relaxed flex-1 line-clamp-3">
                    {kegiatan.deskripsi ||
                        "Bergabunglah dan jadilah bagian dari kegiatan KBMDSI yang inspiratif dan penuh semangat."}
                </p>
                <Button
                    className="w-full bg-green-3 hover:bg-green-1 text-white-1 font-semibold rounded-lg mt-1"
                    onClick={() => onLihat(kegiatan)}
                >
                    Lihat Selengkapnya
                </Button>
            </div>
        </motion.div>
    );
}