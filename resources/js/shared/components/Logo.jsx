import Imaginera from "@/assets/icons/Imajinera.svg";

export default function Logo({ className = 'h-12 w-12', ...props }) {
    return (
        <img src={Imaginera} alt="Logo" className={className} {...props} draggable={false} />
    );
}