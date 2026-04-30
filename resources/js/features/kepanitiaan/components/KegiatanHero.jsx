import { motion } from "framer-motion";
import FadeUp from "@/shared/animations/FadeUp";

export default function KegiatanHero({
    kegiatan,
    sudahDaftar,
    pengumumanSudahTiba,
    onDaftar,
    onPengumuman,
}) {
    const isDisabled  = sudahDaftar && !pengumumanSudahTiba;
    const buttonLabel = pengumumanSudahTiba ? "Pengumuman" : "Daftar Sekarang";
    const handleClick = pengumumanSudahTiba ? onPengumuman : onDaftar;

    return (
        <section
            className="pt-28 pb-16 px-4 md:px-8"
            style={{ backgroundColor: "#F2F2F2" }}
        >
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row gap-10 md:gap-16 items-center">

                {/* ---- Gambar dengan efek cahaya terang ---- */}
                <FadeUp delay={0} className="w-full md:w-2/5 shrink-0">
                    <motion.div
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 20px 60px rgba(2, 109, 120, 0.5), 0 0 30px rgba(154, 179, 76, 0.3)",
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="overflow-hidden rounded-2xl relative"
                        style={{ 
                            boxShadow: "0 15px 45px rgba(2, 109, 120, 0.35), 0 0 20px rgba(154, 179, 76, 0.2)",
                        }}
                    >
                        {kegiatan.gambar ? (
                            <>
                                {/* Gambar utama + brightness boost */}
                                <img
                                    src={kegiatan.gambar}
                                    alt={kegiatan.nama}
                                    className="w-full aspect-[4/3] object-cover"
                                    style={{ filter: "brightness(1.08) saturate(1.1)" }}
                                />
                                {/* Overlay cahaya terang: radial dari tengah-atas */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse 70% 55% at 50% 15%, rgba(255,255,255,0.28) 0%, transparent 80%)",
                                    }}
                                />
                            </>
                        ) : (
                            <div
                                className="w-full aspect-[4/3] flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #499496, #026D78)" }}
                            >
                                <span className="text-white/40 text-sm">Tidak ada gambar</span>
                            </div>
                        )}
                    </motion.div>
                </FadeUp>

                <div className="flex-1 flex flex-col gap-5">
                    <FadeUp delay={1}>
                        <h1 className="text-2xl md:text-3xl font-bold text-black-1 leading-snug">
                            {kegiatan.nama}
                        </h1>
                    </FadeUp>

                    <FadeUp delay={2}>
                        <div className="text-sm md:text-base text-black-1 leading-relaxed space-y-3">
                            {kegiatan.deskripsi ? (
                                <p>{kegiatan.deskripsi}</p>
                            ) : (
                                <>
                                    <p>Mulai langkah pertamamu di dunia organisasi bersama KBMDSI!</p>
                                    <p>
                                        Di program ini, kamu akan belajar bareng, tumbuh bareng, dan
                                        jadi bagian dari tim solid yang siap kikin perubahan di
                                        departemen.
                                    </p>
                                </>
                            )}
                        </div>
                    </FadeUp>

                    <FadeUp delay={3}>
                        <motion.button
                            onClick={!isDisabled ? handleClick : undefined}
                            disabled={isDisabled}
                            whileHover={!isDisabled ? { scale: 1.04 } : {}}
                            whileTap={!isDisabled ? { scale: 0.97 } : {}}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={[
                                "inline-flex items-center justify-center font-semibold",
                                "px-8 py-3 rounded-lg text-sm transition-colors",
                                isDisabled
                                    ? "bg-white border border-gray-300 text-gray-500 cursor-not-allowed opacity-80 shadow-sm"
                                    : "bg-green-3 hover:bg-green-1 text-white shadow-md",
                            ].join(" ")}
                        >
                            {buttonLabel}
                        </motion.button>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}