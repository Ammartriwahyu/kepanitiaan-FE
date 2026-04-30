import React from "react";
import { Head } from "@inertiajs/react";
import { DepartmentHero } from "@/features/departments/components/organisms/DepartmentHero";
import { DepartmentContent } from "@/features/departments/components/organisms/DepartmentContent";
import { DepartmentDesc } from "@/features/departments/components/organisms/DepartmentDesc";
import { departmentsData } from "@/features/departments/data-dummy/departments.js";
import GuestLayout from "@/shared/layouts/GuestLayout";

export default function Show({ id }) {
    // Ambil data berdasarkan ID dari dummy
    const data = departmentsData[id];

    if (!data) return <div className="p-20 text-center font-bold">Halaman Tidak Ditemukan</div>;

    return (
        <>
            <Head title={`Departemen ${data.nama_singkat}`} />
            
            <GuestLayout>

            <main>
                <DepartmentHero 
                    name={data.nama_department}
                />

                <DepartmentDesc 
                        logo={data.logo}
                        description={data.deskripsi} 
                />
                
                <DepartmentContent data={data} />
            </main>

            </GuestLayout>
        </>
    );
}