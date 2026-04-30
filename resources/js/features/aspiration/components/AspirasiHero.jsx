import FadeUp from "@/shared/animations/FadeUp";
import AspirasiForm from "./AspirasiForm";

export default function AspirasiHero() {
    return (
        <section
            className="relative flex flex-col items-center justify-center px-4 pb-16 pt-28 md:pt-32"
        >
            <FadeUp delay={0} className="mb-2 text-center">
                <div className="mb-8 text-center space-y-2 max-w-xl">
                    <h1 className="text-2xl md:text-4xl font-bold text-green-4 leading-tight">
                        Suarakan atau Ungkapkan <span className="text-green-3">Pendapatmu</span>
                    </h1>
                    <p className="text-sm md:text-base text-green-4">
                        Tempat aman untuk menyampaikan aspirasi atau confess,
                        tanpa perlu khawatir identitasmu
                    </p>
                </div>
            </FadeUp>

            <FadeUp delay={2} className="w-full max-w-lg">
                <AspirasiForm />
            </FadeUp>
        </section>
    );
}