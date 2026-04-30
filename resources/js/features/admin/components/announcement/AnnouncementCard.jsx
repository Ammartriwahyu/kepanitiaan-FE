import { Button } from "@/shared/components/shadcdn/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/shared/components/shadcdn/card";
import { CalendarDays, Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/features/admin/lib/formatDate";

export default function AnnouncementCard({ item, onEdit, onDelete }) {
    return (
        <Card className="transition-shadow hover:shadow-md gap-2">
            <CardHeader>
                <div className="flex items-start justify-between flex-wrap">
                    <CardTitle className="text-base truncate">
                        {item.judul}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.isi}
                </p>
            </CardContent>
            <CardFooter className="flex justify-between text-xs text-muted-foreground/70">
                <span className="flex items-center gap-1">
                    <CalendarDays className="size-3" />
                    <span>{formatDate(item.created_at, true)}</span>
                </span>

                <div className="flex items-center gap-2 shrink-0">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(item)}
                    >
                        <Edit className="size-4" />
                        <p className="not-lg:hidden">Edit</p>
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(item)}
                    >
                        <Trash2 className="size-4" />
                        <p className="not-lg:hidden">Hapus</p>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
