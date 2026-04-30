import React from "react";
import { createPortal } from "react-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/shared/components/shadcdn/navigation-menu";
import { cn } from "@/shared/lib/utils";
import { LayoutGrid, Menu as MenuIcon, X } from "lucide-react";
import kbmdsiIcon from "@/assets/icons/kbmdsi.svg";

const departemenLinks = [
    { id: 0, nama: "Pengembangan Internal" }, { id: 1, nama: "Keilmuan & Pengajaran" },
    { id: 2, nama: "Sosial Profesi" },        { id: 3, nama: "PSDM" },
    { id: 4, nama: "Kewirausahaan" },         { id: 5, nama: "Advokesma" },
    { id: 6, nama: "Medkominfo" },            { id: 7, nama: "PIT" },
    { id: 8, nama: "Senat" },
];

function useScroll(t) {
    const [s, set] = React.useState(false);
    const cb = React.useCallback(() => set(window.scrollY > t), [t]);
    React.useEffect(() => { window.addEventListener("scroll", cb); return () => window.removeEventListener("scroll", cb); }, [cb]);
    React.useEffect(() => { cb(); }, [cb]);
    return s;
}

function MobileMenu({ open, children }) {
    if (!open || typeof window === "undefined") return null;
    return createPortal(
        <div className="fixed top-14 left-0 right-0 bottom-0 z-40 bg-white/30 backdrop-blur-lg border-t md:hidden">
            <div className="p-4 flex flex-col gap-1 animate-in zoom-in-97">{children}</div>
        </div>,
        document.body,
    );
}

const navLinkCls = (scrolled) => cn("hover:bg-black/10 rounded-md px-4 py-2 text-sm md:text-base text-white font-medium", scrolled && "text-black/70");
const mLinkCls = "px-3 py-3 rounded-lg text-sm font-medium hover:bg-black/10 transition-colors";
const mLinkCls2 = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-black/10 transition-colors";

export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);
    React.useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

    const iconCls = cn("size-5 text-white", scrolled && "text-black/70");

    return (
        <header className={cn(
            "fixed left-0 right-0 top-0 z-50 mx-auto w-full py-2 md:py-5 max-w-[1440px] border-b border-transparent md:rounded-2xl md:border md:transition-all md:ease-out",
            scrolled && !open && "lg:px-12 py-2 bg-background/95 supports-[backdrop-filter]:bg-white/30 backdrop-blur-lg md:top-4 md:max-w-3xl lg:max-w-7xl md:shadow",
            open && "bg-white/30 backdrop-blur-lg",
        )}>
            <nav className={cn("flex h-14 w-full items-center justify-between px-4 md:transition-all", scrolled && "md:px-2")}>
                <a href="/" className="flex items-center gap-3">
                    <img src={kbmdsiIcon} className={cn("transition-all", scrolled ? "size-10 md:size-12 brightness-0" : "size-10 md:size-16")} />
                    <div className="leading-tight">
                        <p className={cn("text-sm md:text-base font-semibold text-white", scrolled && "text-black/70")}>Keluarga Besar Mahasiswa</p>
                        <p className={cn("text-sm md:text-base font-medium text-white", scrolled && "text-black/70 md:text-sm")}>Departemen Sistem Informasi</p>
                    </div>
                </a>

                <div className="hidden md:flex items-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuLink href="/aspiration" className={navLinkCls(scrolled)}>Aspirasi</NavigationMenuLink>
                            <NavigationMenuLink href="/activity" className={navLinkCls(scrolled)}>Kegiatan</NavigationMenuLink>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className={cn("bg-transparent hover:bg-black/10 text-sm md:text-base text-white font-medium", scrolled && "text-black/70")}>
                                    Profil
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-white/30 backdrop-blur-2xl">
                                    <div className="w-80 p-2">
                                        <a href="/about" className="flex items-start rounded-lg p-3 hover:bg-black/10 transition-colors">
                                            <p className="text-sm font-semibold">Tentang Kami</p>
                                        </a>
                                        <div className="px-3 pb-1 pt-2">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                                                <LayoutGrid className="size-3" /> Departemen
                                            </p>
                                        </div>
                                        <ul className="grid grid-cols-2">
                                            {departemenLinks.map(({ id, nama }) => (
                                                <li key={id}>
                                                    <a href={`/departments/${id}`} className="flex rounded-md px-3 py-2 hover:bg-black/10 transition-colors">
                                                        <span className="text-sm font-medium">{nama}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md hover:bg-accent"
                    aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle menu">
                    {open ? <X className={iconCls} /> : <MenuIcon className={iconCls} />}
                </button>
            </nav>

            <MobileMenu open={open}>
                <a href="/aspiration" onClick={() => setOpen(false)} className={mLinkCls}>Aspirasi</a>
                <a href="/activity" onClick={() => setOpen(false)} className={mLinkCls}>Kegiatan</a>
                <a href="/about" onClick={() => setOpen(false)} className={mLinkCls2}>Tentang Kami</a>
                <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                    <LayoutGrid className="size-3" /> Departemen
                </p>
                {departemenLinks.map(({ id, nama }) => (
                    <a key={id} href={`/departments/${id}`} onClick={() => setOpen(false)} className={mLinkCls2}>
                        <span className="size-1.5 rounded-full bg-muted-foreground/50 shrink-0" />{nama}
                    </a>
                ))}
            </MobileMenu>
        </header>
    );
}
