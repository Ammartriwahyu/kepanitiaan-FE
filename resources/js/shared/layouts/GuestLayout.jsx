import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";

export default function GuestLayout({ children, className, style }) {
    return (
        <div className={`min-h-screen bg-slate-50 ${className}`}
            style={style}
        >
            <Navbar />

            <main className="w-full">{children}</main>

            <Footer />
        </div>
    );
}
