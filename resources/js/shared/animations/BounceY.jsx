import { motion } from "framer-motion";

export default function BounceY({
    yOffset = 8,
    duration = 1.2,
    as = "div",
    className,
    children,
    ...props
}) {
    const Component = motion[as] ?? motion.div;

    return (
        <Component
            className={className}
            animate={{ y: [0, yOffset, 0] }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            {...props}
        >
            {children}
        </Component>
    );
}