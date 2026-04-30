import { motion } from "framer-motion";

export default function FadeScale({
    initialScale = 0.8,
    duration = 0.3,
    as = "div",
    className,
    children,
    ...props
}) {
    const Component = motion[as] ?? motion.div;

    return (
        <Component
            className={className}
            initial={{ opacity: 0, scale: initialScale }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: initialScale }}
            transition={{ duration, ease: "easeOut" }}
            {...props}
        >
            {children}
        </Component>
    );
}