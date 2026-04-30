import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import GuestLayout from "@/shared/layouts/GuestLayout";
import FormPendaftaran from "@/features/kepanitiaan/components/FormPendaftaran";

export default function Pendaftaran({ kepanitiaan }) {
    const [mahasiswa, setMahasiswa] = useState(null);
    const [ready,     setReady]     = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem("kepanitiaan_mahasiswa");

        if (!stored) {
            router.visit("/kegiatan");
            return;
        }

        setMahasiswa(JSON.parse(stored));
        setReady(true);
    }, []);

    const handleBack    = () => router.visit(`/kegiatan/${kepanitiaan.id}`);
    const handleSuccess = () => router.visit(`/kegiatan/${kepanitiaan.id}`);

    if (!ready) {
        return (
            <GuestLayout>
                <div
                    className="min-h-screen flex items-center justify-center"
                    style={{ backgroundColor: "#F2F2F2" }}
                >
                    <Loader2 className="size-8 text-green-2 animate-spin" />
                </div>
            </GuestLayout>
        );
    }

    return (
        <>
            <Head title={`Daftar – ${kepanitiaan.nama}`} />

            <GuestLayout>
                <FormPendaftaran
                    kegiatan={kepanitiaan}
                    mahasiswa={mahasiswa}
                    onBack={handleBack}
                    onSuccess={handleSuccess}
                />
            </GuestLayout>
        </>
    );
}
