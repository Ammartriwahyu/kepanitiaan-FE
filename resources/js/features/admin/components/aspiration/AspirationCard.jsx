import { Badge } from "@/shared/components/shadcdn/badge";
import { Button } from "@/shared/components/shadcdn/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/shared/components/shadcdn/card";
import { CalendarDays, Clock, Target, Trash2, User } from "lucide-react";
import { getExpiryStatus } from "@/features/admin/lib/status";
import { formatDate } from "@/features/admin/lib/formatDate";

export default function AspirationCard({ aspirasi, onDelete, isSuperAdmin }) {
    const expiry = getExpiryStatus(aspirasi.expired_at);

    const isInactive = aspirasi.deleted_at !== null && aspirasi.deleted_at !== undefined;

    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <User className="size-4 text-muted-foreground shrink-0" />
                            <span className="font-medium text-sm">
                                {!aspirasi.nama_pengirim ? (
                                    <span className="italic text-muted-foreground">
                                        Anonim
                                    </span>
                                ) : (
                                    aspirasi.nama_pengirim
                                )}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Target className="size-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground">
                                {aspirasi.tujuan_aspirasi}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                            <Clock className="size-3" />
                            {expiry.label}
                        </Badge>
                        {isInactive && (
                            <Badge variant="destructive">
                                Non-aktif
                            </Badge>
                        )}
                        {isSuperAdmin && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => onDelete?.(aspirasi)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{aspirasi.pesan_aspirasi}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-1 mt-3 text-xs text-muted-foreground/70">
                <CalendarDays className="size-3" />
                <span>Dibuat: {formatDate(aspirasi.created_at, true)}</span>
                <span className="mx-1">·</span>
                <span>Expired: {formatDate(aspirasi.expired_at, true)}</span>
            </CardFooter>
        </Card>
    );
}
