import Logo from "@/shared/components/Logo";
import { Button } from "@/shared/components/shadcdn/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/shadcdn/dropdown-menu";
import { Separator } from "@/shared/components/shadcdn/separator";
import { Link, usePage, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    User,
    LogOut,
    Menu,
    X,
    ChevronUp,
    MessageSquareQuote,
    Megaphone,
    ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { Head } from "@inertiajs/react";

function NavItem({ href, active, icon: Icon, children }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            }`}
        >
            {Icon && <Icon className="size-4 shrink-0" />}
            <span>{children}</span>
        </Link>
    );
}

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const handleLogout = () => {
        router.post(route("logout"));
    };

    const sidebarContent = (
        <>
            <div className="flex h-16 shrink-0 items-center gap-3 px-4">
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-8" />
                    <span className="font-semibold text-sidebar-foreground text-sm">
                        IMAGINERA
                    </span>
                </Link>
            </div>
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                <p className="px-3 py-1 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">
                    Menu
                </p>
                <NavItem
                    href={route("admin.aspiration")}
                    active={route().current("admin.aspiration")}
                    icon={MessageSquareQuote}
                >
                    Aspirasi
                </NavItem>
                <NavItem
                    href={route("admin.announcement")}
                    active={route().current("admin.announcement")}
                    icon={Megaphone}
                >
                    Pengumuman
                </NavItem>
                <NavItem
                    href={route("admin.committee")}
                    active={route().current("admin.committee")}
                    icon={ClipboardList}
                >
                    Kepanitiaan
                </NavItem>
                <NavItem
                    href={route("profile.edit")}
                    active={route().current("profile.edit")}
                    icon={User}
                >
                    Akun
                </NavItem>
            </nav>

            {/* User section at bottom */}
            <div className="p-3">
                <Separator className="mb-3 bg-sidebar-border" />
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent/50 transition-colors text-left">
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-sidebar-foreground">
                                {user.name}
                            </p>
                            <p className="truncate text-xs text-sidebar-foreground/60">
                                {user.email}
                            </p>
                        </div>
                        <ChevronUp className="size-4 shrink-0 text-sidebar-foreground/50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                            variant="destructive"
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogOut className="size-4" />
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Head title="Admin" />
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex md:w-64 md:flex-col shadow-xl bg-sidebar shrink-0 h-screen sticky top-0">
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setMobileSidebarOpen(false)}
                    />
                    <aside className="relative z-50 flex w-64 flex-col border-r bg-sidebar">
                        {sidebarContent}
                    </aside>
                </div>
            )}

            {/* Main content */}
            <div className="flex flex-1 flex-col min-w-0">
                {/* Top bar */}
                <header className="flex h-16 shrink-0 items-center gap-4 shadow-md bg-background px-4 sm:px-6">
                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="md:hidden"
                        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    >
                        {mobileSidebarOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                        <span className="sr-only">Toggle sidebar</span>
                    </Button>

                    {/* Header content */}
                    <div className="flex-1">{header}</div>
                </header>

                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
