import AdminLayout from "@/features/admin/layouts/AdminLayout";
import CommitteeDetailInfo from "@/features/admin/components/committee/CommitteeDetailInfo";
import CommitteeRegistrant from "@/features/admin/components/committee/CommitteeRegistrant";
import DeleteConfirm from "@/features/admin/components/DeleteConfirm";
import { useCommitteeDetail } from "@/features/admin/hooks/useCommitteeDetail";
import { Button } from "@/shared/components/shadcdn/button";
import { Card, CardContent } from "@/shared/components/shadcdn/card";
import { Head, Link, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import axios from "axios";

export default function CommitteeDetail() {
    const { committeeId } = usePage().props;
    const selectedId = Number(committeeId);
    const { committee, registrants, loading, error, removeRegistrant } =
        useCommitteeDetail(selectedId);
    const [search, setSearch] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);

    const safeKepanitiaan = committee ?? {
        nama: "",
        tanggalBuka: "",
        tanggalTutup: "",
        divisis: [],
    };

    const filtered = useMemo(
        () =>
            registrants.filter((p) => {
                const divisiSatu =
                    p.divisi_satu?.nama_divisi ??
                    p.divisiSatu?.nama_divisi ??
                    "";
                const divisiDua =
                    p.divisi_dua?.nama_divisi ?? p.divisiDua?.nama_divisi ?? "";

                return (
                    p.nama.toLowerCase().includes(search.toLowerCase()) ||
                    p.nim.includes(search) ||
                    p.prodi.toLowerCase().includes(search.toLowerCase()) ||
                    divisiSatu.toLowerCase().includes(search.toLowerCase()) ||
                    divisiDua.toLowerCase().includes(search.toLowerCase())
                );
            }),
        [registrants, search],
    );

    const handleDelete = async () => {
        await removeRegistrant(deleteTarget.id);
        setDeleteTarget(null);
    };

    const handleStatusChange = async (registrantId, status) => {
        try {
            await axios.put(
                `/api/v1/daftar-kepanitiaan/${registrantId}/status`,
                { status_kelulusan: status }
            );
            // Refresh registrants list
            window.location.reload();
        } catch (err) {
            console.error("Gagal update status:", err);
            alert("Gagal mengupdate status kelulusan");
        }
    };

    const handleExport = () => {
        window.location.href = `/api/v1/kepanitiaan/export/${selectedId}`;
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-foreground line-clamp-1">
                        {safeKepanitiaan.nama}
                    </h2>
                </div>
            }
        >
            <Head title={`${safeKepanitiaan.nama} - Pendaftar`} />

            <div className="py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <Button asChild>
                        <Link href={route("admin.committee")}>
                            <ArrowLeft className="size-4" />
                            Balik
                        </Link>
                    </Button>

                    {loading ? (
                        <Card>
                            <CardContent className="py-12 text-center text-muted-foreground">
                                Memuat detail kepanitiaan...
                            </CardContent>
                        </Card>
                    ) : error ? (
                        <Card>
                            <CardContent className="py-12 text-center text-destructive">
                                Gagal memuat detail kepanitiaan. Silakan coba lagi.
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <CommitteeDetailInfo
                                committee={safeKepanitiaan}
                                registrantCount={registrants.length}
                            />

                            <CommitteeRegistrant
                                registrants={registrants}
                                filteredRegistrants={filtered}
                                search={search}
                                onSearchChange={setSearch}
                                onExportClick={handleExport}
                                onDeleteClick={setDeleteTarget}
                                onStatusChange={handleStatusChange}
                            />
                        </>
                    )}
                </div>
            </div>

            <DeleteConfirm
                open={!!deleteTarget}
                onOpenChange={() => setDeleteTarget(null)}
                title="Hapus Pendaftar?"
                description={
                    <>
                        Data pendaftaran atas nama{" "}
                        <span className="font-medium">
                            "{deleteTarget?.nama}"
                        </span>{" "}
                        akan dihapus permanen.
                    </>
                }
                onConfirm={handleDelete}
            />
        </AdminLayout>
    );
}
