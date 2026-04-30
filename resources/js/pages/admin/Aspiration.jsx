import AdminLayout from "@/features/admin/layouts/AdminLayout";
import { dummyAspirasi } from "@/features/admin/data-dummy/aspirasi";
import { getExpiryStatus } from "@/features/admin/lib/status";
import Stat from "@/features/admin/components/Stat";
import SearchInput from "@/features/admin/components/SearchInput";
import AspirationCard from "@/features/admin/components/aspiration/AspirationCard";
import DeleteConfirm from "@/features/admin/components/DeleteConfirm";
import { Head, usePage } from "@inertiajs/react";
import { Clock, MessageSquareQuote, User } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/shared/components/shadcdn/card";

export default function Aspiration() {
    const { auth, aspirations } = usePage().props;
    const [search, setSearch] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [aspirasiList, setAspirasiList] = useState(aspirations || dummyAspirasi);

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            const response = await fetch(`/api/v1/aspiration/${deleteTarget.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal menghapus aspirasi.');
            }

            setAspirasiList((prev) =>
                prev.map((item) =>
                    item.id === deleteTarget.id
                        ? { ...item, deleted_at: new Date().toISOString() }
                        : item
                )
            );

            console.log('Aspirasi berhasil dihapus dan deleted_at sudah terisi di database');

        } catch (error) {
            console.error('Error:', error.message);
            alert('Gagal menghapus aspirasi: ' + error.message);
        }

        setDeleteTarget(null);
    };

    const filtered = aspirasiList.filter(
        (a) =>
            a.tujuan_aspirasi.toLowerCase().includes(search.toLowerCase()) ||
            a.pesan_aspirasi.toLowerCase().includes(search.toLowerCase()) ||
            (a.nama_pengirim && a.nama_pengirim.toLowerCase().includes(search.toLowerCase())) ||
            (!a.nama_pengirim && "anonim".includes(search.toLowerCase())),
    );

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold text-foreground">
                    Aspirasi
                </h2>
            }
        >
            <section className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <Stat
                            icon={MessageSquareQuote}
                            value={aspirasiList.length}
                            label="Total Aspirasi"
                        />
                        <Stat
                            icon={User}
                            iconClassName="text-orange-500"
                            bgClassName="bg-orange-500/10"
                            value={aspirasiList.filter((a) => !a.nama_pengirim).length}
                            label="Anonim"
                        />
                        <Stat
                            icon={Clock}
                            iconClassName="text-green-500"
                            bgClassName="bg-green-500/10"
                            value={
                                aspirasiList.filter(
                                    (a) =>
                                        getExpiryStatus(a.expired_at).days > 0 &&
                                        (!a.deleted_at || a.deleted_at === null),
                                ).length
                            }
                            label="Masih Aktif"
                        />
                    </div>

                    <SearchInput
                        placeholder="Cari berdasarkan tujuan, nama, atau isi..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="grid lg:grid-cols-2 gap-4">
                        {filtered.length === 0 ? (
                            <div className="col-span-2">
                                <Card>
                                    <CardContent className="py-12 text-center text-muted-foreground">
                                        Tidak ada aspirasi ditemukan.
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            filtered.map((aspirasi) => (
                                <AspirationCard
                                    key={aspirasi.id}
                                    aspirasi={aspirasi}
                                    onDelete={setDeleteTarget}
                                    isSuperAdmin={auth.user?.role === 'superadmin'}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            <DeleteConfirm
                open={!!deleteTarget}
                onOpenChange={() => setDeleteTarget(null)}
                title="Hapus Aspirasi?"
                description={
                    <>
                        Aspirasi dari{" "}
                        <span className="font-medium">
                            "{deleteTarget?.nama_pengirim || "Anonim"} - {deleteTarget?.tujuan_aspirasi}"
                        </span>{" "}
                        akan dihapus permanen.
                    </>
                }
                onConfirm={handleDelete}
            />
        </AdminLayout>
    );
}
