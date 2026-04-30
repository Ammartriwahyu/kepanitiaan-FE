import AdminLayout from "@/features/admin/layouts/AdminLayout";
import { dummyAnnouncement } from "@/features/admin/data-dummy/announcement";
import SearchInput from "@/features/admin/components/SearchInput";
import AnnouncementCard from "@/features/admin/components/announcement/AnnouncementCard";
import AnnouncementFormDialog from "@/features/admin/components/announcement/AnnouncementForm";
import DeleteConfirm from "@/features/admin/components/DeleteConfirm";
import { Button } from "@/shared/components/shadcdn/button";
import { Card, CardContent } from "@/shared/components/shadcdn/card";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Announcement() {
    const [data, setData] = useState(dummyAnnouncement);
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [form, setForm] = useState({ judul: "", isi: "" });
    const [deleteTarget, setDeleteTarget] = useState(null);

    const filtered = data.filter(
        (p) =>
            p.judul.toLowerCase().includes(search.toLowerCase()) ||
            p.isi.toLowerCase().includes(search.toLowerCase()) ||
            p.kategori.toLowerCase().includes(search.toLowerCase()),
    );

    const openCreate = () => {
        setEditTarget(null);
        setForm({ judul: "", isi: "" });
        setDialogOpen(true);
    };

    const openEdit = (item) => {
        setEditTarget(item);
        setForm({ judul: item.judul, isi: item.isi});
        setDialogOpen(true);
    };

    const handleSave = () => {
        if (!form.judul.trim() || !form.isi.trim()) return;
        if (editTarget) {
            setData((prev) =>
                prev.map((p) =>
                    p.id === editTarget.id ? { ...p, ...form } : p,
                ),
            );
        } else {
            setData((prev) => [
                {
                    id: Date.now(),
                    ...form,
                    created_at: new Date().toISOString(),
                },
                ...prev,
            ]);
        }
        setDialogOpen(false);
    };

    const handleDelete = () => {
        setData((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
    };

    return (
        <AdminLayout
            header={
                <span className="flex items-center justify-between w-full">
                    <h2 className="md:text-xl font-semibold text-foreground">
                        Pengumuman
                    </h2>
                    <Button onClick={openCreate}>
                        <Plus className="size-4" />
                        <p className="hidden md:block">Buat Pengumuman</p>
                    </Button>
                </span>
            }
        >
            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <SearchInput
                            placeholder="Cari pengumuman..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1"
                        />
                    </div>

                    <div className="space-y-4">
                        {filtered.length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    Tidak ada pengumuman ditemukan.
                                </CardContent>
                            </Card>
                        ) : (
                            filtered.map((item) => (
                                <AnnouncementCard
                                    key={item.id}
                                    item={item}
                                    onEdit={openEdit}
                                    onDelete={setDeleteTarget}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <AnnouncementFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                editTarget={editTarget}
                form={form}
                setForm={setForm}
                onSave={handleSave}
            />

            <DeleteConfirm
                open={!!deleteTarget}
                onOpenChange={() => setDeleteTarget(null)}
                title="Hapus Pengumuman?"
                description={
                    <>
                        Pengumuman{" "}
                        <span className="font-medium">
                            "{deleteTarget?.judul}"
                        </span>{" "}
                        akan dihapus permanen.
                    </>
                }
                onConfirm={handleDelete}
            />
        </AdminLayout>
    );
}
