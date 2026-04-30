import AdminLayout from "@/features/admin/layouts/AdminLayout";
import CommitteeCard from "@/features/admin/components/committee/CommitteeCard";
import CommitteeForm from "@/features/admin/components/committee/CommitteeForm";
import DeleteConfirm from "@/features/admin/components/DeleteConfirm";
import {
    buildCommitteePayload,
    committeeToFormState,
    createEmptyCommitteeForm,
} from "@/features/admin/lib/committee";
import { useCommittees } from "@/features/admin/hooks/useCommittees";
import { Button } from "@/shared/components/shadcdn/button";
import { Card, CardContent } from "@/shared/components/shadcdn/card";
import { Head } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function Committee() {
    const { committees, loading, error, refresh } = useCommittees();
    const [formOpen, setFormOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [form, setForm] = useState(createEmptyCommitteeForm());
    const [deleteTarget, setDeleteTarget] = useState(null);

    const openCreate = () => {
        setEditTarget(null);
        setForm(createEmptyCommitteeForm());
        setFormOpen(true);
    };

    const openEdit = async (item) => {
        const response = await axios.get(`/api/v1/kepanitiaan/${item.id}`);
        const detail = response.data.data.kepanitiaan;

        setEditTarget(detail);
        setForm(committeeToFormState(detail));
        setFormOpen(true);
    };

    const handleSave = async () => {
        const { payload, cleanDivisi } = buildCommitteePayload(form);
        if (
            !form.nama.trim() ||
            !form.tanggalBuka ||
            !form.tanggalTutup ||
            cleanDivisi.length === 0
        ) {
            alert("Harap isi semua field yang diperlukan");
            return;
        }

        try {
            console.log("Saving payload:", payload);
            if (editTarget) {
                await axios.put(`/api/v1/kepanitiaan/${editTarget.id}`, payload);
            } else {
                await axios.post("/api/v1/kepanitiaan", payload);
            }
            await refresh();
            setFormOpen(false);
        } catch (error) {
            console.error("Full error response:", error.response?.data);
            const message = error.response?.data?.message || error.response?.data?.errors || error.message;
            alert(`Gagal menyimpan: ${JSON.stringify(message)}`);
        }
    };

    const handleDelete = async () => {
        await axios.delete(`/api/v1/kepanitiaan/${deleteTarget.id}`);
        await refresh();
        setDeleteTarget(null);
    };

    return (
        <AdminLayout
            header={
                <span className="flex items-center justify-between w-full">
                    <h2 className="md:text-xl font-semibold text-foreground">
                        Kepanitiaan
                    </h2>
                    <Button onClick={openCreate}>
                        <Plus className="size-4" />
                        <p className="hidden md:block">Buat Kepanitiaan</p>
                    </Button>
                </span>
            }
        >
            <Head title="Admin" />

            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
                    {/* List */}
                    <div className="space-y-3">
                        {loading ? (
                            <Card>
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    Memuat data kepanitiaan...
                                </CardContent>
                            </Card>
                        ) : error ? (
                            <Card>
                                <CardContent className="py-12 text-center text-destructive">
                                    Gagal memuat data kepanitiaan.
                                </CardContent>
                            </Card>
                        ) : committees.length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    Tidak ada kepanitiaan ditemukan.
                                </CardContent>
                            </Card>
                        ) : (
                            committees.map((kep) => (
                                <CommitteeCard
                                    key={kep.id}
                                    kep={kep}
                                    onEdit={openEdit}
                                    onDelete={setDeleteTarget}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <CommitteeForm
                open={formOpen}
                onOpenChange={setFormOpen}
                editTarget={editTarget}
                form={form}
                setForm={setForm}
                onSave={handleSave}
            />

            <DeleteConfirm
                open={!!deleteTarget}
                onOpenChange={() => setDeleteTarget(null)}
                title="Hapus Kepanitiaan?"
                description={
                    <>
                        Kepanitiaan{" "}
                        <span className="font-medium">
                            "{deleteTarget?.nama}"
                        </span>{" "}
                        beserta seluruh data pendaftar akan dihapus permanen.
                    </>
                }
                onConfirm={handleDelete}
            />
        </AdminLayout>
    );
}
