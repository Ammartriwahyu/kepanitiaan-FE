import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import GuestLayout from "@/shared/layouts/GuestLayout";
import KegiatanCard from "@/features/kepanitiaan/components/KegiatanCard";
import LoginModal from "@/features/kepanitiaan/components/LoginModal";
import FadeUp from "@/shared/animations/FadeUp";

export default function Kegiatan({ kepanitiaans = [] }) {
    const [loginTarget, setLoginTarget] = useState(null);

    const handleLihat = (kegiatan) => {
        setLoginTarget(kegiatan);
    };

    const handleLoginSuccess = (mahasiswa) => {
        sessionStorage.setItem("kepanitiaan_mahasiswa", JSON.stringify(mahasiswa));
        router.visit(`/kegiatan/${loginTarget.id}`);
    };

    return (
        <>
            <Head title="Kegiatan" />

            <GuestLayout>

                <section className="min-h-screen pt-28 pb-20 px-4 bg-green-2">
                    <FadeUp delay={0} className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white-1">
                            Ragam Kegiatan &amp; Kontribusi KBMDSI
                        </h1>
                        <div className="h-px bg-white-1/25 w-full max-w-4xl mx-auto mt-4" />
                    </FadeUp>

                    {kepanitiaans.length === 0 ? (
                        <FadeUp delay={1} className="text-center py-16">
                            <p className="text-white-1/60 text-lg">
                                Tidak ada kegiatan yang sedang berlangsung.
                            </p>
                        </FadeUp>
                    ) : (
                        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                            {kepanitiaans.map((kegiatan, index) => (
                                <KegiatanCard
                                    key={kegiatan.id}
                                    kegiatan={kegiatan}
                                    index={index}
                                    onLihat={handleLihat}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <LoginModal
                    open={!!loginTarget}
                    onClose={() => setLoginTarget(null)}
                    kepanitiaanId={loginTarget?.id}
                    onSuccess={handleLoginSuccess}
                />
            </GuestLayout>
        </>
    );
}
