import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/shared/layouts/GuestLayout";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <GuestLayout>
                <div className="flex items-center justify-center">
               <h1 className="font-bold text-black text-7xl">Ini Home</h1>
                </div>
            </GuestLayout>
        </>
    );
}
