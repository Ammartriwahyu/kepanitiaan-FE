import FadeUp from "@/shared/animations/FadeUp";
import { Card, CardContent } from "@/shared/components/shadcdn/card";
import { CalendarDays, Clock, Target, User } from "lucide-react";
import { getExpiryStatus } from "@/features/admin/lib/status";
import { formatDate } from "@/features/admin/lib/formatDate";

export default function AspirasiCard({ aspirasi, index = 0 }) {
    const expiry = getExpiryStatus(aspirasi.expired_at);

    return (
        <FadeUp delay={index % 21} className="h-full">

            <Card className="transition-shadow hover:shadow-md h-full">
                <CardContent className="p-4 flex flex-col gap-3 h-full">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0 text-green-2">
                            <User className="size-4 text-muted-foreground shrink-0" />
                            <span className="text-sm font-medium truncate ">
                                {aspirasi.nama_pengirim ? (
                                    aspirasi.nama_pengirim
                                ) : (
                                    <span>Anonim</span>
                                )}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 text-green-2">
                            <Clock className="size-3" />
                            <span>{expiry.label}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Target className="size-4 shrink-0 text-green-2" />
                        <span className="text-sm font-medium text-green-8 truncate">
                            {aspirasi.tujuan_aspirasi}
                        </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1 text-green-2">
                        {aspirasi.pesan_aspirasi}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground/70 pt-2 border-t border-border">
                        <CalendarDays className="size-3 shrink-0" />
                        <span>Dibuat: {formatDate(aspirasi.created_at)}</span>
                        <span className="mx-1">·</span>
                        <span>Expired: {formatDate(aspirasi.expired_at)}</span>
                    </div>
                </CardContent>
            </Card>
        </FadeUp>
    );
}