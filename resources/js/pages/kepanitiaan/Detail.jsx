import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import GuestLayout from "@/shared/layouts/GuestLayout";
import KegiatanHero from "@/features/kepanitiaan/components/KegiatanHero";
import CountdownSection from "@/features/kepanitiaan/components/CountdownSection";
import { useCountdown } from "@/features/kepanitiaan/hooks/useCountdown";

export default function Detail({ kepanitiaan }) {
    const [pendaftaran, setPendaftaran] = useState(null);
    const [loading,     setLoading]     = useState(true);

    const { selesai } = useCountdown(kepanitiaan?.tanggal_pengumuman ?? null);

    const pengumumanSudahTiba =
        !!kepanitiaan?.tanggal_pengumuman &&
        (selesai || new Date() >= new Date(kepanitiaan.tanggal_pengumuman));

    const flagKey    = `kepanitiaan_sudah_daftar_${kepanitiaan.id}`;
    const sudahDaftar = !!pendaftaran;

    useEffect(() => {
        const stored = sessionStorage.getItem("kepanitiaan_mahasiswa");
        if (!stored) { router.visit("/kegiatan"); return; }

        const flag = sessionStorage.getItem(flagKey);
        if (flag === "1") {
            setPendaftaran({ _local: true, kepanitiaan_id: kepanitiaan.id });
        }

        const mhs = JSON.parse(stored);
        checkRegistration(mhs.nim);
    }, [kepanitiaan.id]);

    const checkRegistration = async (nim) => {
        try {
            const res = await axios.get(`/api/v1/daftar-kepanitiaan/${kepanitiaan.id}`);
            const pendaftar = res.data?.data?.pendaftar ?? [];

            let userRecord = null;
            if (nim && nim !== "null") {
                userRecord = pendaftar.find(
                    (p) => String(p.nim).trim() === String(nim).trim()
                ) ?? null;
            }

            if (userRecord) {

                setPendaftaran(userRecord);
                sessionStorage.setItem(flagKey, "1");
            }
        } catch {
        } finally {
            setLoading(false);
        }
    };

    const handleDaftar     = () => router.visit(`/kegiatan/${kepanitiaan.id}/daftar`);
    const handlePengumuman = () => router.visit(`/kegiatan/${kepanitiaan.id}/pengumuman`);

    if (loading) {
        return (
            <GuestLayout>
                <div className="min-h-screen flex items-center justify-center"
                     style={{ backgroundColor: "#F2F2F2" }}>
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="size-8 text-green-2 animate-spin" />
                        <p className="text-green-2 text-sm font-medium">Memuat data...</p>
                    </div>
                </div>
            </GuestLayout>
        );
    }

    return (
        <>
            <Head title={kepanitiaan.nama} />
            <GuestLayout>
                <KegiatanHero
                    kegiatan={kepanitiaan}
                    sudahDaftar={sudahDaftar}
                    pengumumanSudahTiba={pengumumanSudahTiba}
                    onDaftar={handleDaftar}
                    onPengumuman={handlePengumuman}
                />

                {sudahDaftar && (
                    <CountdownSection
                        kegiatan={kepanitiaan}
                        sudahDaftar={sudahDaftar}
                        pengumumanSudahTiba={pengumumanSudahTiba}
                    />
                )}
            </GuestLayout>
        </>
    );
}
