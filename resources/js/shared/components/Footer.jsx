import { Icon } from "@iconify/react";
import FadeUp from "@/shared/animations/FadeUp";
import FloatHover from "@/shared/animations/FloatHover";
import Logo from "./Logo";
import { address, map, email, twitter, instagram, tiktok, line, youtube, linkedin } from "@/shared/constants/kbmdsi";

const socialLinks = [
    { icon: "mdi:instagram",      label: "Instagram", href: instagram },
    { icon: "mdi:linkedin",       label: "LinkedIn",  href: linkedin },
    { icon: "ic:baseline-tiktok", label: "TikTok",    href: tiktok },
    { icon: "uil:line",           label: "Line",      href: line },
    { icon: "ri:twitter-x-fill",  label: "X",         href: twitter },
    { icon: "mdi:youtube",        label: "YouTube",   href: youtube },
];

export default function Footer() {
    return (
        <footer className="w-full shadow-[0_-6px_12px_rgba(0,0,0,0.10)]">
            <div className="mx-auto w-full max-w-[1440px] px-4 py-6 md:pb-12 sm:px-6 lg:px-20">
                <div className="flex flex-col gap-x-10 md:flex-row sm:justify-between sm:items-start">

                    <FadeUp delay={0} className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <Logo className="w-10 md:w-24 lg:w-36" />
                            <p className="text-xl md:lg:text-2xl lg:text-3xl font-bold tracking-tight sm:text-4xl">
                                <span className="text-green-4">KBMDSI</span>{" "}
                                <span className="text-green-3">2025</span>
                            </p>
                        </div>
                        <p className="font-semibold text-green-2 text-sm sm:text-base not-md:hidden">
                            Wujudkan imajinasi,<br />bangun era baru bersama KBMDSI
                        </p>
                    </FadeUp>

                    <FadeUp delay={5} className="flex flex-col gap-6 sm:max-w-sm">
                        <div className="flex flex-col gap-3">
                            <p className="font-bold text-green-4 not-md:hidden md:text-2xl">Get In Touch</p>
                            <div className="space-y-2 text-green-4">
                                <div className="flex gap-3 items-center">
                                    <Icon icon="mdi:map-marker" className="size-5 shrink-0 mt-0.5 text-black" />
                                    <a href={map} target="_blank" className="leading-snug hover:underline transition-all text-sm md:text-base">{address}</a>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Icon icon="mdi:email" className="size-5 shrink-0 text-black" />
                                    <a href={`mailto:${email}`} className="hover:underline transition-all text-sm md:text-base">{email}</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="font-bold text-green-4 md:text-2xl">Follow Us</p>
                            <div className="flex items-center gap-4 flex-wrap">
                                {socialLinks.map((s, i) => (
                                    <FadeUp key={s.label} delay={2 + i * 0.5}>
                                        <FloatHover as="a" href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="flex">
                                            <Icon icon={s.icon} className="size-4 md:size-6" />
                                        </FloatHover>
                                    </FadeUp>
                                ))}
                            </div>
                        </div>
                    </FadeUp>

                </div>
            </div>

            <div className="bg-green-2 w-full px-4 py-4 sm:px-6 lg:px-8">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-16 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                    <p className="flex items-center gap-1.5 text-sm not-md:hidden text-white">
                        <Icon icon="mdi:copyright" className="h-4 w-4" /> 2026 Imagenera KBMDSI. All Rights Reserved
                    </p>
                    <a href="https://github.com/KBMDSI" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-white hover:opacity-75 transition-opacity">
                        Made with love by PIT KBMDSI 2026 <Icon icon="mdi:heart" className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
