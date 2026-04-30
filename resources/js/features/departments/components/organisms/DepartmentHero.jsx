import React from "react";
import contohJpg from "@/assets/icons/departments/contohgmbr.jpg";

export const DepartmentHero = ({ name }) => (
    <section className="relative w-full h-[500px] flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 bg-green-2/80 z-10" />
        <img 
            src={contohJpg} 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Department Group"
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-white w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 max-w-4xl leading-tight">
                Departemen <br />
                {name}
            </h1>
        </div>
    </section>
);