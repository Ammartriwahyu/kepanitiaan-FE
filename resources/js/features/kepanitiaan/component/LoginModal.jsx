import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/shared/components/shadcdn/button";
import { Input } from "@/shared/components/shadcdn/input";
import { X, Loader2 } from "lucide-react";
import PetalDecor from "../animations/PetalDecor";

export default function LoginModal({ open, onClose, onSuccess, kepanitiaanId }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError("NIM/Email dan Kata Sandi wajib diisi.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `/api/v1/daftar-kepanitiaan/login/${kepanitiaanId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Login gagal. Periksa kembali kredensial kamu.");
                return;
            }
            onSuccess(data.data);
        } catch {
            setError("Terjadi kesalahan. Coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleBackdropClick}
                >
                    {/* Backdrop blur */}
                    <motion.div
                        className="absolute inset-0 bg-green-4/30 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal container with petals */}
                    <div className="relative z-10 w-full max-w-xl px-6">
                        {/* Floating petal decoration */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <PetalDecor />
                        </div>

                        {/* Form card */}
                        <motion.div
                            className="relative bg-green-2 rounded-2xl shadow-2xl p-8 md:p-10"
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.34, 1.56, 0.64, 1],
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white-1/60 hover:text-white-1 transition-colors"
                            >
                                <X className="size-5" />
                            </button>

                            <h2 className="text-white-1 font-bold text-xl text-center mb-6 tracking-wide uppercase">
                                Form Masuk
                            </h2>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 rounded-lg bg-red-500/20 border border-red-400/40 px-4 py-2.5 text-sm text-red-200"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-white-1 text-sm font-medium">
                                        NIM/Email
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full rounded-lg bg-white-1 text-green-4 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-3 placeholder:text-green-4/40"
                                        placeholder=""
                                        autoComplete="username"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-white-1 text-sm font-medium">
                                        Kata Sandi
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-lg bg-white-1 text-green-4 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-3 placeholder:text-green-4/40"
                                        placeholder=""
                                        autoComplete="current-password"
                                    />
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
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}