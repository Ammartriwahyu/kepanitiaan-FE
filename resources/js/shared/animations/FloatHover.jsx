import { motion } from "framer-motion";

export default function FloatHover({
    yOffset = -5,
    scale = 1.15,
    as = "div",
    className,
    children,
    ...props
}) {
    const Component = motion[as] ?? motion.div;

    return (
        <Component
            className={className}
            whileHover={{ y: yOffset, scale }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            {...props}
        >
            {children}
        </Component>
    );
}
