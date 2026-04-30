import GuestLayout from "@/shared/layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import AspirasiHero from "@/features/aspiration/components/AspirasiHero";
import AspirasiList from "@/features/aspiration/components/AspirasiList";
import { useAspirasiSearch } from "@/features/aspiration/hooks/UseAspirasiSearch";

const PAGE_BACKGROUND = {
    background: "var(--color-white-green)",
};

export default function Aspiration() {
    const { aspirations } = usePage().props;
    const { search, setSearch, filtered } = useAspirasiSearch(aspirations);

    return (
        <>
            <Head title="Aspirasi" />
            <GuestLayout style={PAGE_BACKGROUND}>
                <AspirasiHero />
                <div className="border-t border-green-2/100 mx-6" />
                <AspirasiList
                    aspirations={aspirations}
                    filtered={filtered}
                    search={search}
                    onSearchChange={setSearch}
                />
            </GuestLayout>
        </>
    );
}