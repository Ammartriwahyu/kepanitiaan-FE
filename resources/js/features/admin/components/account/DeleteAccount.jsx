import { useState, useRef } from "react";
import { Button } from "@/shared/components/shadcdn/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/shadcdn/dialog";
import { Input } from "@/shared/components/shadcdn/input";
import { useForm } from "@inertiajs/react";
import CameraConfirmModal from "./CameraConfirmModal";
import { motion } from "framer-motion";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const passwordInput = useRef();
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({ password: "" });

    const closeDeleteModal = () => {
        setConfirmingDeletion(false);
        clearErrors();
        reset();
    };

    const deleteUser = (e) => {
        e.preventDefault();
        setShowCamera(true);
    };

    const handleCameraConfirm = () => {
        setShowCamera(false);
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeDeleteModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-semibold text-foreground">
                    Hapus Akun
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Ini fitur darurat andai ada kejadian yang tidak diinginkan.
                    Pikirin dulu sebelum digunakan.
                </p>
            </header>

            <motion.div
                animate={{ x: ["0%", "80%"] }}
                transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="w-full"
            >
                <Button
                    variant="destructive"
                    onClick={() => setConfirmingDeletion(true)}
                >
                    Hapus Akun
                </Button>
            </motion.div>

            <Dialog
                open={confirmingDeletion}
                onOpenChange={(open) => {
                    if (!open) closeDeleteModal();
                }}
            >
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Yakin nih mau hapus akun?</DialogTitle>
                        <DialogDescription>
                            Kalau akun ini dihapus, semua data departemen bakal
                            ikut kehapus dan nggak bisa dibalikin lagi. Cek
                            dulu, jangan sampai ada yang masih dibutuhin ya.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={deleteUser} id="delete-user-form">
                        <div className="space-y-1.5">
                            <Input
                                id="delete-password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                autoFocus
                                placeholder="Masukkan Password"
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </form>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={closeDeleteModal}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            form="delete-user-form"
                            type="submit"
                            disabled={!data.password || processing}
                        >
                            Hapus Akun
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <CameraConfirmModal
                open={showCamera}
                onConfirm={handleCameraConfirm}
                onCancel={() => setShowCamera(false)}
            />
        </section>
    );
}
