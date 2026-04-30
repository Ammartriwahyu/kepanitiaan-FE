import { useState } from "react";
import { Button } from "@/shared/components/shadcdn/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/shadcdn/dialog";
import Camera from "./Camera";

export default function CameraConfirmModal({ open, onConfirm, onCancel }) {
    const [image, setImage] = useState(null);

    const handleOpenChange = (isOpen) => {
        if (!isOpen) {
            setImage(null);
            onCancel();
        }
    };

    const handleConfirm = () => {
        onConfirm(image);
        setImage(null);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Konfirmasi Identitas</DialogTitle>
                    <DialogDescription>
                        Kami perlu tahu kamu siapa
                    </DialogDescription>
                </DialogHeader>

                <Camera onCapture={setImage} />

                <DialogFooter>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => handleOpenChange(false)}
                    >
                        Batal
                    </Button>
                    <Button
                        type="button"
                        disabled={!image}
                        onClick={handleConfirm}
                    >
                        Konfirmasi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
