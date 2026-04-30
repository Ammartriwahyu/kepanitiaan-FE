import { useState, useRef } from "react";
import { Button } from "@/shared/components/shadcdn/button";
import { Input } from "@/shared/components/shadcdn/input";
import { Label } from "@/shared/components/shadcdn/label";
import { useForm } from "@inertiajs/react";
import CameraConfirmModal from "./CameraConfirmModal";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [showCamera, setShowCamera] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowCamera(true);
    };

    const handleConfirm = () => {
        setShowCamera(false);
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-semibold text-foreground">
                    Update Password
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Pastikan mencatat password dan tidak menyimpan password
                    sendirian.
                    <br />
                    Kalo hilang, anak PIT cuman bisa bantu menghapus akun,
                    gabisa mengembalikannya karena password dienkrip.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="space-y-1.5">
                    <Label htmlFor="current_password">Password Saat Ini</Label>
                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        autoComplete="current-password"
                        aria-invalid={!!errors.current_password}
                    />
                    {errors.current_password && (
                        <p className="text-sm text-destructive">
                            {errors.current_password}
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="password">Password Baru</Label>
                    <Input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        autoComplete="new-password"
                        aria-invalid={!!errors.password}
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="password_confirmation">
                        Konfirmasi Password Baru
                    </Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        autoComplete="new-password"
                        aria-invalid={!!errors.password_confirmation}
                    />
                    {errors.password_confirmation && (
                        <p className="text-sm text-destructive">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-4 justify-end">
                    <Button type="submit" disabled={processing}>
                        Simpan
                    </Button>
                    {recentlySuccessful && (
                        <p className="text-sm text-muted-foreground">
                            Tersimpan.
                        </p>
                    )}
                </div>
            </form>

            <CameraConfirmModal
                open={showCamera}
                onConfirm={handleConfirm}
                onCancel={() => setShowCamera(false)}
            />
        </section>
    );
}
