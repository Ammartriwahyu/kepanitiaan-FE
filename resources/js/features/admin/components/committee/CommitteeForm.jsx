import { Button } from "@/shared/components/shadcdn/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/shadcdn/dialog";
import { Input } from "@/shared/components/shadcdn/input";
import { Plus, X } from "lucide-react";

export default function CommitteeForm({
    open,
    onOpenChange,
    editTarget,
    form,
    setForm,
    onSave,
}) {
    const updateField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const updateDivisiAt = (index, value) => {
        setForm((prev) => {
            const nextDivisi = [...prev.divisi];
            nextDivisi[index] = value;
            return { ...prev, divisi: nextDivisi };
        });
    };

    const handleAddDivisi = () => {
        setForm((prev) => ({ ...prev, divisi: [...prev.divisi, ""] }));
    };

    const handleRemoveDivisi = (idx) =>
        setForm((prev) => ({
            ...prev,
            divisi: prev.divisi.filter((_, i) => i !== idx),
        }));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        {editTarget
                            ? "Edit Kepanitiaan"
                            : "Buat Kepanitiaan Baru"}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Nama Kepanitiaan</label>
                        <Input
                            placeholder="Contoh: ORIENTASI MAHASISWA BARU 2026"
                            value={form.nama}
                            onChange={(e) =>
                                updateField("nama", e.target.value)
                            }
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Tanggal Buka</label>
                            <Input
                                type="date"
                                value={form.tanggalBuka}
                                onChange={(e) =>
                                    updateField("tanggalBuka", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Tanggal Tutup</label>
                            <Input
                                type="date"
                                value={form.tanggalTutup}
                                onChange={(e) =>
                                    updateField("tanggalTutup", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Deskripsi Kepanitiaan</label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Masukkan deskripsi kepanitiaan..."
                            value={form.deskripsi || ""}
                            onChange={(e) =>
                                updateField("deskripsi", e.target.value)
                            }
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Tanggal Pengumuman</label>
                            <Input
                                type="date"
                                value={form.tanggal_pengumuman || ""}
                                onChange={(e) =>
                                    updateField("tanggal_pengumuman", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Link Grup WhatsApp (untuk yang lulus)</label>
                            <Input
                                type="url"
                                placeholder="https://chat.whatsapp.com/..."
                                value={form.link_grup_whatsapp || ""}
                                onChange={(e) =>
                                    updateField("link_grup_whatsapp", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="font-medium">Divisi</label>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleAddDivisi}
                            >
                                <Plus className="size-3.5 mr-1" />
                                Tambah Divisi
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {form.divisi.map((d, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        placeholder={`Divisi ${idx + 1}`}
                                        value={d}
                                        onChange={(e) =>
                                            updateDivisiAt(
                                                idx,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {form.divisi.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="shrink-0 text-muted-foreground hover:text-destructive"
                                            onClick={() =>
                                                handleRemoveDivisi(idx)
                                            }
                                        >
                                            <X className="size-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Batal
                        </Button>
                        <Button onClick={onSave}>
                            {editTarget
                                ? "Simpan Perubahan"
                                : "Buat Kepanitiaan"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
