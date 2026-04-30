import React from "react";
import { ProkerCard } from "../molecules/ProkerCard";
import abstractShape from "@/assets/icons/departments/abstract.png";
import abstractShape2 from "@/assets/icons/departments/abstract2.png";

export const DepartmentContent = ({ data }) => (
    <div className="relative isolate overflow-hidden mx-auto px-6 py-12 bg-[#DFE8E9]">

        <div className="absolute top-0 right-0 w-40 md:w-80 z-[-10] pointer-events-none">
            <img 
                src={abstractShape} 
                alt="" 
                className="w-full h-auto"
            />
        </div>

        <div className="z-10">
            <div className="relative">
                <div className="flex items-center justify-center mb-10">
                    <h2 className="text-3xl font-bold text-green-2">Tupoksi & Program kerja</h2>
                </div>
            </div>

            {/* Tupoksi Grid */}
            <div className="max-w-7xl mx-auto mb-15">
                {data.tupoksi.map((item, index) => (
                    <p key={index} className="text-slate-800 text-center"> {item} </p>
                ))}
            </div>

            {/* Program Kerja Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
                {data.program_kerja.map((proker) => (
                    <ProkerCard 
                        key={proker.id} 
                        title={proker.nama}
                        description={proker.deskripsi} 
                    />
                ))}
            </div>
        </div>

        <div className="absolute bottom-0 left-0 w-64 md:w-[400px] z-[-10] pointer-events-none">
             <img src={abstractShape2} alt="" className="w-full h-auto" />
        </div>
    </div>
);