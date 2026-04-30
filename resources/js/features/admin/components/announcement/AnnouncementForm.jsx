import { Button } from "@/shared/components/shadcdn/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/shadcdn/dialog";
import { Input } from "@/shared/components/shadcdn/input";
import { Textarea } from "@/shared/components/shadcdn/textarea";

export default function AnnouncementForm({
    open,
    onOpenChange,
    editTarget,
    form,
    setForm,
    onSave,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        {editTarget
                            ? "Edit Pengumuman"
                            : "Buat Pengumuman Baru"}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Judul</label>
                        <Input
                            placeholder="Judul pengumuman"
                            value={form.judul}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    judul: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">
                            Isi Pengumuman
                        </label>
                        <Textarea
                        className="max-h-60"
                            placeholder="Tulis isi pengumuman di sini..."
                            rows={5}
                            value={form.isi}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, isi: e.target.value }))
                            }
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Batal
                        </Button>
                        <Button onClick={onSave}>
                            {editTarget ? "Simpan Perubahan" : "Publikasikan"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
