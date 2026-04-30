import LoginForm from "@/features/admin/components/login/LoginForm";
import Logo from "@/shared/components/Logo";
import { Head } from "@inertiajs/react";

export default function Login({ status }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
            <Head title="Admin" />

            <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col items-center">
                    <Logo className="size-24" />
                    <h1 className="text-2xl font-semibold text-foreground">
                        Admin Panel
                    </h1>
                </div>

                <LoginForm status={status} />
            </div>
        </div>
    );
}
