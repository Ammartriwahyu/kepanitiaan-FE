import React from "react";

export const DepartmentDesc = ({ logo, description }) => {
    return (
        <section className="relative">
            <div className="max-w-5xl mx-auto">
                <div className="p-8 md:p-20 flex flex-col md:flex-row items-center mb-20 mt-20 gap-10">
                    
                    {/* Bagian Kiri: Logo Departemen/Gear */}
                    <div className="flex-shrink-0 w-32 md:w-48">
                        <img 
                            src={logo || "/assets/icons/gear-si.png"} 
                            alt="Logo Gear"
                            className="w-full h-auto object-contain drop-shadow-lg"
                        />
                    </div>

                    {/* Bagian Kanan: Deskripsi Teks */}
                    <div className="flex-grow">
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify font-medium">
                            {description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};