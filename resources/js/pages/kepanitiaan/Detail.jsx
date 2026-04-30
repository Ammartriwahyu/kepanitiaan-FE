import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import GuestLayout from "@/shared/layouts/GuestLayout";
import KegiatanHero from "@/features/kepanitiaan/components/KegiatanHero";
import CountdownSection from "@/features/kepanitiaan/components/CountdownSection";
import { useCountdown } from "@/features/kepanitiaan/hooks/useCountdown";

/**
 * Halaman detail kepanitiaan.
 *
 * Fix registrasi:
 *   Setelah daftar, useDaftar menyimpan flag `kepanitiaan_daftar_{id}` di sessionStorage.
 *   Detail.jsx mengecek flag INI DULU untuk immediate UI update, lalu verifikasi ke API.
 *   NIM dibandingkan sebagai String untuk menghindari type mismatch.
 */
export default function Detail({ kepanitiaan }) {
    const [mahasiswa,   setMahasiswa]   = useState(null);
    const [pendaftaran, setPendaftaran] = useState(null);
    const [loading,     setLoading]     = useState(true);

    const { selesai } = useCountdown(kepanitiaan?.tanggal_pengumuman ?? null);

    // pengumumanSudahTiba HANYA true jika ada tanggal DAN sudah lewat
    const pengumumanSudahTiba =
        !!kepanitiaan?.tanggal_pengumuman &&
        (selesai || new Date() >= new Date(kepanitiaan.tanggal_pengumuman));

    const sudahDaftar = !!pendaftaran;

    useEffect(() => {
        const stored = sessionStorage.getItem("kepanitiaan_mahasiswa");
        if (!stored) { router.visit("/kegiatan"); return; }

        const mhs = JSON.parse(stored);
        setMahasiswa(mhs);
        checkRegistration(mhs.nim);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kepanitiaan.id]);

    const checkRegistration = async (nim) => {
        const nimStr = String(nim).trim();

        // ── LANGKAH 1: cek sessionStorage flag untuk immediate response ──
        const flagNim = sessionStorage.getItem(`kepanitiaan_daftar_${kepanitiaan.id}`);
        if (flagNim && flagNim === nimStr) {
            // User sudah daftar menurut flag lokal → set state langsung
            setPendaftaran({ nim: nimStr, kepanitiaan_id: kepanitiaan.id, _local: true });
        }

        // ── LANGKAH 2: verifikasi ke API untuk data lengkap ──
        try {
            const res = await axios.get(`/api/v1/daftar-kepanitiaan/${kepanitiaan.id}`);
            const pendaftar = res.data?.data?.pendaftar ?? [];
            // Bandingkan NIM sebagai string agar tidak ada type mismatch
            const userRecord = pendaftar.find(
                (p) => String(p.nim).trim() === nimStr,
            ) ?? null;

            if (userRecord) {
                setPendaftaran(userRecord);
                // Update flag dengan NIM dari server (canonical form)
                sessionStorage.setItem(`kepanitiaan_daftar_${kepanitiaan.id}`, String(userRecord.nim).trim());
            }
            // Jika userRecord null tapi flag ada → pertahankan state dari flag
        } catch {
            // Network error: biarkan state dari flag (jika ada) tetap berlaku
        } finally {
            setLoading(false);
        }
    };

    const handleDaftar     = () => router.visit(`/kegiatan/${kepanitiaan.id}/daftar`);
    const handlePengumuman = () => router.visit(`/kegiatan/${kepanitiaan.id}/pengumuman`);

    if (loading) {
        return (
            <GuestLayout>
                <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F2F2F2" }}>
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

                {sudahDaftar && kepanitiaan.tanggal_pengumuman && (
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
