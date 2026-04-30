import SearchInput from "@/features/admin/components/SearchInput";
import { Button } from "@/shared/components/shadcdn/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shared/components/shadcdn/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/shadcdn/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/shadcdn/select";
import { Download, Link, Trash2, Users } from "lucide-react";

export default function CommitteeRegistrant({
    registrants,
    filteredRegistrants,
    search,
    onSearchChange,
    onExportClick,
    onDeleteClick,
    onStatusChange,
}) {
    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="size-4" />
                    Daftar Pendaftar
                </CardTitle>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <SearchInput
                        placeholder="Cari nama, NIM, prodi..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="flex-1 sm:w-64"
                    />
                    <Button variant="outline" size="sm" onClick={onExportClick}>
                        <Download className="size-4 mr-1" />
                        Export
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                {registrants.length === 0 ? (
                    <div className="rounded-md border border-dashed py-16 text-center text-muted-foreground space-y-2">
                        <Users className="size-8 mx-auto opacity-40" />
                        <p>Belum ada pendaftar untuk kepanitiaan ini.</p>
                    </div>
                ) : filteredRegistrants.length === 0 ? (
                    <div className="rounded-md border border-dashed py-10 text-center text-sm text-muted-foreground">
                        Tidak ada pendaftar yang cocok dengan pencarian.
                    </div>
                ) : (
                    <div className="rounded-md border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-muted-foreground">
                                        No
                                    </TableHead>
                                    <TableHead className="text-muted-foreground">
                                        Nama
                                    </TableHead>
                                    <TableHead className="text-muted-foreground">
                                        NIM
                                    </TableHead>
                                    <TableHead className="text-muted-foreground">
                                        Program Studi
                                    </TableHead>
                                    <TableHead className="text-muted-foreground">
                                        WhatsApp
                                    </TableHead>
                                    <TableHead className="text-muted-foreground">
                                        Pilihan 1
                                    </TableHead>
                                    <TableHead className="text-muted-foreground">
                                        Pilihan 2
                                    </TableHead>
                                    <TableHead className="text-muted-foreground">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-muted-foreground">
                                        Berkas
                                    </TableHead>
                                    <TableHead className="text-muted-foreground">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRegistrants.map((registrant, idx) => (
                                    <TableRow key={registrant.id}>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {registrant.nama}
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            {registrant.nim}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {registrant.prodi}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {registrant.whatsapp}
                                        </TableCell>
                                        <TableCell>
                                            {registrant.divisi_satu
                                                ?.nama_divisi ??
                                                registrant.divisiSatu
                                                    ?.nama_divisi ??
                                                "-"}
                                        </TableCell>
                                        <TableCell>
                                            {registrant.divisi_dua
                                                ?.nama_divisi ??
                                                registrant.divisiDua
                                                    ?.nama_divisi ??
                                                "-"}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={registrant.status_kelulusan || "null"}
                                                onValueChange={(value) =>
                                                    onStatusChange && onStatusChange(registrant.id, value === "null" ? null : value)
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="null">Belum ada</SelectItem>
                                                    <SelectItem value="lulus">Lulus</SelectItem>
                                                    <SelectItem value="tidak_lulus">Tidak Lulus</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="">
                                            <a
                                                className="text-blue-500 hover:text-blue-700 "
                                                href={registrant.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Link className="size-4" />
                                            </a>
                                        </TableCell>
                                        <TableCell >
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-destructive"
                                                onClick={() =>
                                                    onDeleteClick(registrant)
                                                }
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
