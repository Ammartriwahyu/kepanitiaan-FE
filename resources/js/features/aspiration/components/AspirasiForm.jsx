import { Button } from "@/shared/components/shadcdn/button";
import { Input } from "@/shared/components/shadcdn/input";
import { Textarea } from "@/shared/components/shadcdn/textarea";
import { Label } from "@/shared/components/shadcdn/label";
import { Card, CardContent } from "@/shared/components/shadcdn/card";
import { useSubmitAspirasi } from "@/features/aspiration/hooks/useSubmitAspirasi";

export default function AspirasiForm() {
    const { form, update, submit, submitting, success, error } = useSubmitAspirasi();

    return (
        <Card className="w-full max-w-lg shadow-lg">
            <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-semibold text-center mb-6 text-foreground text-green-5">
                    Sampaikan Pesanmu
                </h2>

                {success && (
                    <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                        Aspirasi berhasil dikirim! Terima kasih sudah menyampaikan pesanmu.
                    </div>
                )}

                {error && (
                    <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4 text-green-5 ">
                    <div className="space-y-1.5 ">
                        <Label htmlFor="nama_pengirim">Nama (Opsional)</Label>
                        <div className="rounded-lg border border-1 border-green-2">
                            <Input
                                id="nama_pengirim"
                                type="text"
                                value={form.nama_pengirim}
                                onChange={(e) => update("nama_pengirim", e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="tujuan_aspirasi">Tujuan</Label>
                        <div className="rounded-lg border border-1 border-green-2">
                            <Input
                                id="tujuan_aspirasi"
                                type="text"
                                value={form.tujuan_aspirasi}
                                onChange={(e) => update("tujuan_aspirasi", e.target.value)}
                                required
                            />

                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="pesan_aspirasi">Pesan</Label>
                        <div className="rounded-lg border border-1 border-green-2">
                            <Textarea
                                id="pesan_aspirasi"
                                rows={5}
                                value={form.pesan_aspirasi}
                                onChange={(e) => update("pesan_aspirasi", e.target.value)}
                                required
                                className="resize-none"
                            />

                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-green-2 hover:bg-green-4 text-white"
                        disabled={submitting}
                    >
                        {submitting ? "Mengirim..." : "Kirim"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}