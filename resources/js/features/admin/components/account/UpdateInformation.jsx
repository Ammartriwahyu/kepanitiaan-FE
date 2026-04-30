import { useState } from "react";
import { Button } from "@/shared/components/shadcdn/button";
import { Input } from "@/shared/components/shadcdn/input";
import { Label } from "@/shared/components/shadcdn/label";
import { useForm, usePage } from "@inertiajs/react";
import CameraConfirmModal from "./CameraConfirmModal";

export default function UpdateProfileInformation({ className = "" }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });
    const [showCamera, setShowCamera] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowCamera(true);
    };

    const handleConfirm = () => {
        setShowCamera(false);
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-semibold text-foreground">
                    Informasi Akun
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Kami menyarankan update email dengan email aktif
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="space-y-1.5">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                        aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-4 justify-end">
                    <Button type="submit" disabled={processing}>
                        Simpan
                    </Button>
                    {recentlySuccessful && (
                        <p className="text-sm text-muted-foreground">Tersimpan.</p>
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
