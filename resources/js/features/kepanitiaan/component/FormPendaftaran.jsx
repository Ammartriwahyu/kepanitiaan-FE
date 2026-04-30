import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/shadcdn/button";
import { usePendaftaran } from "../hooks/usePendaftaran";

export default function FormPendaftaran({ kegiatan, mahasiswa, onBack, onSuccess }) {
    const { form, update, submit, loading, error } = usePendaftaran();

    // Divisi dari kepanitiaan
    const divisis = kegiatan?.divisis ?? [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.pilsatu || !form.pildua) {
            return;
        }

        const divisiSatu = divisis.find((d) => d.nama_divisi === form.pilsatu);
        const divisiDua = divisis.find((d) => d.nama_divisi === form.pildua);

        if (!divisiSatu || !divisiDua) return;

        const ok = await submit(kegiatan.id, divisiSatu.id, divisiDua.id);
        if (ok) onSuccess();
    };

    // Pre-fill dari data mahasiswa jika ada
    const namaValue = form.nama || mahasiswa?.full_name || "";
    const nimValue = form.nim || mahasiswa?.nim || "";

    const fields = [
        { key: "nama", label: "Nama Lengkap", type: "text", full: true, placeholder: "", value: namaValue },
        { key: "nim", label: "NIM", type: "text", full: false, placeholder: "", value: nimValue },
        { key: "prodi", label: "Program Studi", type: "text", full: false, placeholder: "", value: form.prodi },
        { key: "whatsapp", label: "WhatsApp", type: "tel", full: true, placeholder: "", value: form.whatsapp },
        { key: "link", label: "Link Drive", type: "url", full: true, placeholder: "", value: form.link },
    ];

    return (
        <section className="min-h-screen py-16 px-4 relative overflow-hidden">
            {/* Blob decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-green-3/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-green-7/15 blur-2xl pointer-events-none" />

            <div className="relative mx-auto max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-green-2 rounded-2xl shadow-2xl p-8 md:p-10"
                >
                    <h2 className="text-white-1 font-bold text-xl text-center mb-7 tracking-wide uppercase">
                        Form Pendaftaran
                    </h2>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-5 rounded-lg bg-red-500/20 border border-red-400/40 px-4 py-2.5 text-sm text-red-200"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Static fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Nama Lengkap - full width */}
                            <div className="sm:col-span-2 space-y-1.5">
                                <label className="text-white-1 text-sm font-medium">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={namaValue}
                                    onChange={(e) => update("nama", e.target.value)}
                                    required
                                    className="w-full rounded-lg bg-white-1 text-green-4 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-3"
                                />
                            </div>

                            {/* NIM */}
                            <div className="space-y-1.5">
                                <label className="text-white-1 text-sm font-medium">NIM</label>
                                <input
                                    type="text"
                                    value={nimValue}
                                    onChange={(e) => update("nim", e.target.value)}
                                    required
                                    className="w-full rounded-lg bg-white-1 text-green-4 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-3"
                                />
                            </div>

                            {/* Program Studi */}
                            <div className="space-y-1.5">
                                <label className="text-white-1 text-sm font-medium">Program Studi</label>
                                <input
                                    type="text"
                                    value={form.prodi}
                                    onChange={(e) => update("prodi", e.target.value)}
                                    required
                                    className="w-full rounded-lg bg-white-1 text-green-4 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-3"
                                />
                            </div>

                            {/* Pilihan 1 */}
                            <div className="space-y-1.5">
                                <label className="text-white-1 text-sm font-medium">Pilihan 1</label>
                                <select
                                    value={form.pilsatu}
                                    onChange={(e) => update("pilsatu", e.target.value)}
                                    required
                                    className="w-full rounded-lg bg-white-1 text-green-4 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-3"
                                >
                                    <option value="">Pilih divisi</option>
                                    {divisis.map((d) => (
                                        <option key={d.id} value={d.nama_divisi}>
                                            {d.nama_divisi}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Pilihan 2 */}
                            <div className="space-y-1.5">
                                <label className="text-white-1 text-sm font-medium">Pilihan 2</label>
                                <select
                                    value={form.pildua}
                                    onChange={(e) => update("pildua", e.target.value)}
                                    required
                                    className="w-full rounded-lg bg-white-1 text-green-4 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-3"
                                >
                                    <option value="">Pilih divisi</option>
                                    {divisis
                                        .filter((d) => d.nama_divisi !== form.pilsatu)
                                        .map((d) => (
                                            <option key={d.id} value={d.nama_divisi}>
                                                {d.nama_divisi}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* WhatsApp - full */}
                            <div className="sm:col-span-2 space-y-1.5">
                                <label className="text-white-1 text-sm font-medium">WhatsApp</label>
                                <input
                                    type="tel"
                                    value={form.whatsapp}
                                    onChange={(e) => update("whatsapp", e.target.value)}
                                    required
                                    className="w-full rounded-lg bg-white-1 text-green-4 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-3"
                                />
                            </div>

                            {/* Link Drive - full */}
                            <div className="sm:col-span-2 space-y-1.5">
                                <label className="text-white-1 text-sm font-medium">Link Drive</label>
                                <input
                                    type="url"
                                    value={form.link}
                                    onChange={(e) => update("link", e.target.value)}
                                    required
                                    className="w-full rounded-lg bg-white-1 text-green-4 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-3"
                                    placeholder="https://drive.google.com/..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 bg-white-1 text-green-4 font-semibold py-3 rounded-lg hover:bg-green-3 hover:text-white-1 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="size-4 animate-spin" />}
                            Kirim
                        </button>
                    </form>
                </motion.div>

                <button
                    onClick={onBack}
                    className="mt-5 flex items-center gap-2 text-green-4/60 hover:text-green-4 text-sm transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali
                </button>
            </div>
        </section>
    );
}