import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useDaftar } from "@/features/kepanitiaan/hooks/useDaftar";
import kelopakDaun from "@/assets/icons/kepanitiaan/kelopakDaun.webp";

function Field({ label, children }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-white/80 text-sm font-medium">{label}</label>
            {children}
        </div>
    );
}

const inputCls =
    "w-full rounded-xl bg-white/15 border border-white/25 text-white px-4 py-3 text-sm " +
    "placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 " +
    "focus:bg-white/20 disabled:opacity-50 transition-colors";

const selectCls =
    "w-full rounded-xl bg-white/15 border border-white/25 text-white px-4 py-3 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 " +
    "disabled:opacity-50 transition-colors";

export default function FormPendaftaran({ kegiatan, mahasiswa, onBack, onSuccess }) {
    const { form, update, submit, loading, error } = useDaftar(mahasiswa);
    const divisis = kegiatan?.divisis ?? [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await submit(kegiatan.id);
        if (ok) onSuccess?.();
    };

    return (
        <section
            className="w-full py-24 px-4"
            style={{ background: "var(--color-white-green)" }}
        >
            <div className="relative mx-auto max-w-3xl py-16 px-6">

                <motion.img
                    src={kelopakDaun}
                    alt="" aria-hidden="true"
                    className="hidden md:block absolute pointer-events-none select-none"
                    style={{ width: 140, height: 165, top: 30, left: -30,
                          scaleX: -1, zIndex: 0 }}
                    initial={{ opacity: 0, x: -20, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />

                <motion.img
                    src={kelopakDaun}
                    alt="" aria-hidden="true"
                    className="hidden md:block absolute pointer-events-none select-none"
                    style={{ width: 140, height: 165, top: 30, right: -30,
                         transform: "rotate(12deg)", zIndex: 0 }}
                    initial={{ opacity: 0, x: 20, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                />

                <motion.img
                    src={kelopakDaun}
                    alt="" aria-hidden="true"
                    className="hidden md:block absolute pointer-events-none select-none"
                    style={{ width: 130, height: 155, bottom: 30, left: -30,
                         scaleX: -1, scaleY: -1, zIndex: 0 }}
                    initial={{ opacity: 0, x: -20, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
                />

                <motion.img
                    src={kelopakDaun}
                    alt="" aria-hidden="true"
                    className="hidden md:block absolute pointer-events-none select-none"
                    style={{ width: 130, height: 155, bottom: 30, right: -30,
                         scaleY: -1, zIndex: 0 }}
                    initial={{ opacity: 0, x: 20, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
                />

                <motion.div
                    className="relative bg-green-2 rounded-2xl shadow-2xl px-8 py-10"
                    style={{ zIndex: 1 }}
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
            
                    <h2 className="text-white font-bold text-xl uppercase tracking-widest text-center mb-8">
                        Form Pendaftaran
                    </h2>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-5 bg-red-500/20 border border-red-400/40 rounded-lg px-4 py-3 text-red-200 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5">
                    
                        <Field label="Nama Lengkap">
                            <input
                                type="text"
                                value={form.nama}
                                onChange={(e) => update("nama", e.target.value)}
                                className={inputCls}
                                placeholder="Nama lengkap kamu"
                                required disabled={loading}
                            />
                        </Field>

                      
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="NIM">
                                <input
                                    type="text"
                                    value={form.nim}
                                    onChange={(e) => update("nim", e.target.value)}
                                    className={inputCls}
                                    placeholder="NIM kamu"
                                    required disabled={loading}
                                />
                            </Field>
                            <Field label="Program Studi">
                                <input
                                    type="text"
                                    value={form.prodi}
                                    onChange={(e) => update("prodi", e.target.value)}
                                    className={inputCls}
                                    placeholder="Program studi"
                                    required disabled={loading}
                                />
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Pilihan 1">
                                <select
                                    value={form.divisi_pilihan_satu_id}
                                    onChange={(e) => update("divisi_pilihan_satu_id", e.target.value)}
                                    className={selectCls}
                                    required disabled={loading}
                                >
                                    <option value="" className="text-gray-700">Pilih divisi</option>
                                    {divisis.map((d) => (
                                        <option key={d.id} value={d.id} className="text-gray-700">
                                            {d.nama_divisi}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="Pilihan 2">
                                <select
                                    value={form.divisi_pilihan_dua_id}
                                    onChange={(e) => update("divisi_pilihan_dua_id", e.target.value)}
                                    className={selectCls}
                                    required disabled={loading}
                                >
                                    <option value="" className="text-gray-700">Pilih divisi</option>
                                    {divisis.map((d) => (
                                        <option key={d.id} value={d.id} className="text-gray-700">
                                            {d.nama_divisi}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <Field label="WhatsApp">
                            <input
                                type="tel"
                                value={form.whatsapp}
                                onChange={(e) => update("whatsapp", e.target.value)}
                                className={inputCls}
                                placeholder="Nomor WhatsApp aktif (contoh: 08123...)"
                                required disabled={loading}
                            />
                        </Field>

                        <Field label="Link Drive">
                            <input
                                type="url"
                                value={form.link}
                                onChange={(e) => update("link", e.target.value)}
                                className={inputCls}
                                placeholder="https://drive.google.com/..."
                                required disabled={loading}
                            />
                        </Field>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-semibold rounded-xl py-3.5 mt-2 hover:bg-white/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading && <Loader2 className="size-4 animate-spin" />}
                            {loading ? "Mengirim..." : "Kirim"}
                        </button>
                    </form>

                    <button
                        type="button"
                        onClick={onBack}
                        className="mt-6 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mx-auto"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
