import { motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
};

export default function FadeUp({ delay = 0, as = "div", className, children, ...props }) {
    const Component = motion[as] ?? motion.div;

    return (
        <Component
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={delay}
            {...props}
        >
            {children}
        </Component>
    );
}
