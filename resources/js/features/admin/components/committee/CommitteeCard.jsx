import { Badge } from "@/shared/components/shadcdn/badge";
import { Button } from "@/shared/components/shadcdn/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/shadcdn/card";
import { CalendarDays, Edit, ArrowRight, Trash2, Users } from "lucide-react";
import { Link } from "@inertiajs/react";
import { formatDate } from "@/features/admin/lib/formatDate";

export default function CommitteeCard({ kep, onEdit, onDelete }) {
    const now = new Date();
    const status =
        now < new Date(kep.tanggalBuka)
            ? { label: "Belum Buka", variant: "secondary" }
            : now > new Date(kep.tanggalTutup)
              ? { label: "Ditutup", variant: "destructive" }
              : { label: "Buka", variant: "default" };

    const pendaftarCount = kep.pendaftarCount ?? kep.pendaftar?.length ?? 0;

    return (
        <Card className="transition-shadow hover:shadow-md gap-2">
            <CardHeader className="flex items-start gap-2">
                <CardTitle className="text-base line-clamp-1">
                    {kep.nama}
                </CardTitle>
                <Badge variant={status.variant}>{status.label}</Badge>
            </CardHeader>
            <CardContent className="flex items-center gap-x-4 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                    <CalendarDays className="size-3" />
                    Buka: {formatDate(kep.tanggalBuka)}
                </span>
                <span className="flex items-center gap-1">
                    <CalendarDays className="size-3" />
                    Tutup: {formatDate(kep.tanggalTutup)}
                </span>
                <span className="flex items-center gap-1">
                    <Users className="size-3" />
                    {pendaftarCount} Pendaftar
                </span>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(kep)}>
                    <Edit className="size-4" />
                    <p className="hidden lg:block">Edit</p>
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(kep)}
                >
                    <Trash2 className="size-4" />
                    <p className="hidden lg:block">Hapus</p>
                </Button>
                <Button asChild size="sm">
                    <Link href={route("admin.committee.detail", kep.id)}>
                        <Users className="size-4 mr-1" />
                        <p className="hidden md:block">Pendaftar</p>
                        <ArrowRight className="size-4 ml-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
