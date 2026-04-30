import { AnimatePresence } from "framer-motion";
import { Input } from "@/shared/components/shadcdn/input";
import { Badge } from "@/shared/components/shadcdn/badge";
import { Search, ChevronDown } from "lucide-react";
import AspirasiCard from "./AspirasiCard";
import BounceY from "@/shared/animations/BounceY";
import FadeScale from "@/shared/animations/FadeScale";
import { useAspirasiPagination } from "@/features/aspiration/hooks/useAspirasiPagination";


export default function AspirasiList({ aspirations, filtered, search, onSearchChange }) {
    const { visibleItems, hasMore, remaining, loadMore } = useAspirasiPagination(filtered);

    return (
        <section className="py-12 px-4">
            <div className="mx-auto max-w-6xl">

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-white-1">
                            Aspirasi
                        </h2>
                        <Badge className="bg-green-4 text-white-1 gap-1 p-3">
                            Semua{" "}
                            <span className="font-bold bg-green-7 rounded-full w-5 h-3 p-2 flex items-center justify-center text-white-1">
                                {aspirations.length}
                            </span>
                        </Badge>
                    </div>

                    <div className="relative w-full sm:w-72 bg-white-1 rounded-lg border border-2 border-green-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            className="pl-9"
                            placeholder="Cari Aspirasi"
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="relative overflow-y-auto rounded-xl pr-1">
 
                    {filtered.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-green-4/70 text-sm">
                            {search
                                ? "Tidak ada aspirasi yang cocok dengan pencarianmu."
                                : "Belum ada aspirasi yang disampaikan."}
                        </div>
                    ) : (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                                {visibleItems.map((aspirasi, index) => (
                                    <AspirasiCard
                                        key={aspirasi.id}
                                        aspirasi={aspirasi}
                                        index={index}
                                    />
                                ))}
                            </div>
 
                            <AnimatePresence>
                                {hasMore && (
                                    <FadeScale className="flex flex-col items-center gap-2 py-6">
                                        <p className="text-xs text-green-4/60">
                                            {remaining} aspirasi lagi
                                        </p>
                                        <BounceY
                                            as="button"
                                            onClick={loadMore}
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-4 text-white shadow-md hover:bg-green-2 transition-colors cursor-pointer"
                                            aria-label="Muat lebih banyak aspirasi"
                                        >
                                            <ChevronDown className="size-5" />
                                        </BounceY>
                                    </FadeScale>
                                )}
                            </AnimatePresence>
 
                            {!hasMore && visibleItems.length > 0 && (
                                <FadeScale className="flex justify-center py-6 text-xs text-green-4/50">
                                    Semua aspirasi sudah ditampilkan
                                </FadeScale>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
 