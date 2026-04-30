import { motion } from "framer-motion";

const BLOBS = [
    {
        pos: { top: -56, left: -56 },
        size: { width: 200, height: 200 },
        gradient: "linear-gradient(135deg, #9ab34c 0%, #026D78 100%)",
        rotate: 18,
        delay: 0,
    },
    {
        pos: { top: -56, right: -56 },
        size: { width: 188, height: 188 },
        gradient: "linear-gradient(225deg, #9cd5ff 0%, #7ab2b2 100%)",
        rotate: -22,
        delay: 0.1,
    },
    {
        pos: { bottom: -56, left: -56 },
        size: { width: 195, height: 195 },
        gradient: "linear-gradient(45deg, #026D78 0%, #499496 80%)",
        rotate: -16,
        delay: 0.08,
    },
    {
        pos: { bottom: -56, right: -56 },
        size: { width: 212, height: 212 },
        gradient: "linear-gradient(315deg, #9ab34c 0%, #026D78 80%)",
        rotate: 24,
        delay: 0.18,
    },
];

export default function PetalDecor() {
    return (
        <>
            {BLOBS.map((blob, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-3xl pointer-events-none"
                    style={{
                        ...blob.pos,
                        ...blob.size,
                        background: blob.gradient,
                        position: "absolute",
                    }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{
                        opacity: 0.82,
                        scale: 1,
                        rotate: blob.rotate,
                        y: [0, -8, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.7, delay: blob.delay },
                        scale:   { duration: 0.7, delay: blob.delay, ease: "easeOut" },
                        rotate:  { duration: 0.7, delay: blob.delay, ease: "easeOut" },
                        y: {
                            duration: 3.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: blob.delay + 0.9,
                        },
                    }}
                />
            ))}
        </>
    );
}
