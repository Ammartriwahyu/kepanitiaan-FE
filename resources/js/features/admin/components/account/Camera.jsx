import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { Button } from "@/shared/components/shadcdn/button";
import { Power } from "lucide-react";

export default function Camera({ onCapture = () => {} }) {
    const webcamRef = useRef(null);
    const [active, setActive] = useState(false);
    const [image, setImage] = useState(null);

    const capture = () => {
        const img = webcamRef.current.getScreenshot();
        setImage(img);
        onCapture(img);
    };

    const retake = () => {
        setImage(null);
        onCapture(null);
    };
    const toggle = () => setActive((v) => !v);

    return (
        <div className="space-y-2">
            {active && !image && (
                <div className="w-full aspect-square overflow-hidden rounded-md">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full object-cover"
                        videoConstraints={{ facingMode: "user" }}
                    />
                </div>
            )}

            {image && (
                <div className="w-full aspect-square overflow-hidden rounded-md">
                    <img
                        src={image}
                        alt="Captured"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="flex gap-2">
                {!active && !image && (
                    <Button type="button" variant="outline" onClick={toggle}>
                        Aktifkan Kamera
                    </Button>
                )}
                {active && !image && (
                    <>
                        <Button type="button" onClick={capture}>
                            Ambil Foto
                        </Button>
                        <Button
                            type="icon"
                            variant="destructive"
                            onClick={toggle}
                        >
                            <Power />
                        </Button>
                    </>
                )}
                {image && (
                    <Button type="button" variant="outline" onClick={retake}>
                        Ulangi
                    </Button>
                )}
            </div>
        </div>
    );
}
