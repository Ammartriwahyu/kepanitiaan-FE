import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import GuestLayout from "@/shared/layouts/GuestLayout";
import PengumumanSection from "@/features/kepanitiaan/components/PengumumanSection";

export default function Pengumuman({ kepanitiaan }) {
    const [pendaftaran, setPendaftaran] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem("kepanitiaan_mahasiswa");

        if (!stored) {
            router.visit("/kegiatan");
            return;
        }

        const mhs = JSON.parse(stored);
        fetchStatus(mhs.nim);
    }, [kepanitiaan.id]);

    const fetchStatus = async (nim) => {
        try {
            const res = await axios.get(`/api/v1/daftar-kepanitiaan/${kepanitiaan.id}`);
            const pendaftar = res.data?.data?.pendaftar ?? [];
            const userRecord = pendaftar.find(
                (p) => String(p.nim).trim() === String(nim).trim()
            ) ?? null;
            setPendaftaran(userRecord);
        } catch {
            setPendaftaran(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <GuestLayout>
                <div
                    className="min-h-screen flex items-center justify-center"
                    style={{ backgroundColor: "#F2F2F2" }}
                >
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="size-8 text-green-2 animate-spin" />
                        <p className="text-green-2 text-sm font-medium">Memuat pengumuman...</p>
                    </div>
                </div>
            </GuestLayout>
        );
    }

    return (
        <>
            <Head title={`Pengumuman – ${kepanitiaan.nama}`} />

            <GuestLayout>
                <PengumumanSection
                    kegiatan={kepanitiaan}
                    pendaftaran={pendaftaran}
                />
            </GuestLayout>
        </>
    );
}
