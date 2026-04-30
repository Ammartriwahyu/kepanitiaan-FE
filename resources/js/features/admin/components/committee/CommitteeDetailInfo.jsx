import { formatDate } from "@/features/admin/lib/formatDate";
import { Badge } from "@/shared/components/shadcdn/badge";
import { Card, CardContent } from "@/shared/components/shadcdn/card";
import { CalendarDays } from "lucide-react";

export default function CommitteeDetailInfo({ committee, registrantCount }) {
    if (!committee) {
        return null;
    }

    const divisis = committee.divisis ?? [];

    return (
        <Card>
            <CardContent className="flex flex-wrap items-start gap-6">
                <div className="space-y-1 flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight truncate">
                        {committee.nama}
                    </h3>
                    <div className="flex gap-x-4 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                            <CalendarDays className="size-3.5" />
                            Buka: {formatDate(committee.tanggalBuka)}
                        </span>
                        <span className="flex items-center gap-1">
                            <CalendarDays className="size-3.5" />
                            Tutup: {formatDate(committee.tanggalTutup)}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {divisis.map((divisi) => (
                            <Badge
                                key={divisi.id}
                                variant="outline"
                                className="text-xs"
                            >
                                {divisi.nama_divisi}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{registrantCount}</p>
                        <p className="text-xs text-muted-foreground">
                            Pendaftar
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">
                            {divisis.length}
                        </p>
                        <p className="text-xs text-muted-foreground">Divisi</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
