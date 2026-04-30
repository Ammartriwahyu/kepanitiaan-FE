import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useLogin } from "@/features/kepanitiaan/hooks/useLogin";
import kelopakDaun from "@/assets/icons/kepanitiaan/kelopakDaun.webp";

export default function LoginModal({ open, onClose, kepanitiaanId, onSuccess }) {
    const { form, update, submit, loading, error, reset } = useLogin();

    useEffect(() => { if (!open) reset(); }, [open]);

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mahasiswa = await submit(kepanitiaanId);
        if (mahasiswa) onSuccess(mahasiswa);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-black/35 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <div className="relative z-10 w-full max-w-xl">

                        <motion.img
                            src={kelopakDaun}
                            alt=""
                            aria-hidden="true"
                            className="hidden md:block absolute pointer-events-none select-none"
                            style={{
                                width: 185,
                                height: 210,
                                top: -70,
                                left: -80,
                                scaleX: -1,  
                                transformOrigin: "center",
                                zIndex: 0,
                            }}
                            initial={{ opacity: 0, x: -30, y: -20, scale: 0.7 }}
                            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                        />

                        <motion.img
                            src={kelopakDaun}
                            alt=""
                            aria-hidden="true"
                            className="hidden md:block absolute pointer-events-none select-none"
                            style={{
                                width: 185,
                                height: 210,
                                top: -70,
                                right: -80,
                                transformOrigin: "center",
                                zIndex: 0,
                            }}
                            initial={{ opacity: 0, x: 30, y: -20, scale: 0.7 }}
                            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
                        />

                        <motion.div
                            className="relative bg-green-2 rounded-2xl shadow-2xl px-10 py-10"
                            style={{ zIndex: 1 }}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button" onClick={onClose}
                                className="absolute top-4 right-4 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                aria-label="Tutup"
                            >
                                <X className="size-4" />
                            </button>

                            <h2 className="text-white font-bold text-xl uppercase tracking-widest text-center mb-8">
                                Form Masuk
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
                                <div className="space-y-2">
                                    <label className="block text-white/80 text-sm font-medium">
                                        NIM/Email
                                    </label>
                                    <input
                                        type="text"
                                        value={form.nim}
                                        onChange={(e) => update("nim", e.target.value)}
                                        className="w-full rounded-xl bg-white/90 text-green-4 px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-3 placeholder:text-gray-400"
                                        placeholder="NIM atau email @ub.ac.id"
                                        required autoComplete="username" disabled={loading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-white/80 text-sm font-medium">
                                        Kata Sandi
                                    </label>
                                    <input
                                        type="password"
                                        value={form.password}
                                        onChange={(e) => update("password", e.target.value)}
                                        className="w-full rounded-xl bg-white/90 text-green-4 px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-3 placeholder:text-gray-400"
                                        placeholder="Kata sandi UB kamu"
                                        required autoComplete="current-password" disabled={loading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 bg-white/20 text-white font-semibold rounded-xl py-3.5 mt-2 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
                                >
                                    {loading && <Loader2 className="size-4 animate-spin" />}
                                    {loading ? "Memproses..." : "Kirim"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
