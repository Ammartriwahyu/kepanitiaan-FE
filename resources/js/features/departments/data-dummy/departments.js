import piLogo from "@/assets/icons/departments/webp/pi.webp";
import kpLogo from "@/assets/icons/departments/webp/kp.webp";
import sosprofLogo from "@/assets/icons/departments/webp/sosprof.webp";
import psdmLogo from "@/assets/icons/departments/webp/psdm.webp";
import kwuLogo from "@/assets/icons/departments/webp/kwu.webp";
import advokesmaLogo from "@/assets/icons/departments/webp/advokesma.webp";
import medkominfoLogo from "@/assets/icons/departments/webp/medkominfo.webp";
import pitLogo from "@/assets/icons/departments/webp/pit.webp";
import senatLogo from "@/assets/icons/departments/webp/senat.webp";

export const departmentsData = {
    0: {
        id: 0,
        nama_singkat: "PI",
        nama_department: "Pengembangan Internal",
        logo: piLogo,
        deskripsi: "Fokus pada penguatan internal organisasi dan keharmonisan antar anggota.",
        tupoksi: ["Meningkatkan bonding anggota", "Evaluasi internal"],
        program_kerja: []
    },
    1: {
        id: 1,
        nama_singkat: "KP",
        nama_department: "Keilmuan dan Pengajaran",
        logo: kpLogo,
        deskripsi: "Fokus pada penguatan internal organisasi dan keharmonisan antar anggota.",
        tupoksi: ["Meningkatkan bonding anggota", "Evaluasi internal"],
        program_kerja: []
    },
    2: {
        id: 2,
        nama_singkat: "Sosprof",
        nama_department: "Sosial Profesi",
        logo: sosprofLogo,
        deskripsi: "Fokus pada penguatan internal organisasi dan keharmonisan antar anggota.",
        tupoksi: ["Meningkatkan bonding anggota", "Evaluasi internal"],
        program_kerja: []
    },
    3: {
        id: 3,
        nama_singkat: "PSDM",
        nama_department: "Pengembangan Sumber Daya Manusia",
        logo: psdmLogo,
        deskripsi: "Fokus pada penguatan internal organisasi dan keharmonisan antar anggota.",
        tupoksi: ["Meningkatkan bonding anggota", "Evaluasi internal"],
        program_kerja: []
    },
    4: {
        id: 4,
        nama_singkat: "KWU",
        nama_department: "Kewirausahaan",
        logo: kwuLogo,
        deskripsi: "Fokus pada penguatan internal organisasi dan keharmonisan antar anggota.",
        tupoksi: ["Meningkatkan bonding anggota", "Evaluasi internal"],
        program_kerja: []
    },
    5: {
        id: 5,
        nama_singkat: "Advokesma",
        nama_department: "Advokesma",
        logo: advokesmaLogo,
        deskripsi: "Fokus pada penguatan internal organisasi dan keharmonisan antar anggota.",
        tupoksi: ["Meningkatkan bonding anggota", "Evaluasi internal"],
        program_kerja: []
    },
    6: {
        id: 6,
        nama_singkat: "Medkominfo",
        nama_department: "Media dan Komunikasi Informasi",
        logo: medkominfoLogo,
        deskripsi: "Fokus pada penguatan internal organisasi dan keharmonisan antar anggota.",
        tupoksi: ["Meningkatkan bonding anggota", "Evaluasi internal"],
        program_kerja: []
    },
    7: {
        id: 7,
        nama_singkat: "PIT",
        nama_department: "Pengembangan Informatika dan Teknologi",
        logo: pitLogo,
        deskripsi: "",
        tupoksi: [
            "Departemen yang bertujuan mengembangkan skill dan pengetahuan mahasiswa Departemen Sistem Informasi di bidang IT."
        ],
        program_kerja: [
            {
                id: 1,
                nama: "Web Maintenance",
                deskripsi: "Layanan unggulan yang dirancang untuk memenuhi kebutuhan organisasi dalam membangun, mengelola, dan memelihara situs web secara berkelanjutan.", // [cite: 15]
                image: "/assets/images/proker/web-maintenance.jpg"
            },
            {
                id: 2,
                nama: "Jasa Coding",
                deskripsi: "Layanan pembuatan solusi perangkat lunak dan bimbingan teknis pemrograman untuk mendukung proyek akademik maupun profesional.",
                image: "/assets/images/proker/jasa-coding.jpg"
            },
            {
                id: 3,
                nama: "IT Workshop",
                deskripsi: "Pelatihan intensif mengenai teknologi terbaru seperti Web Development, Data Science, atau UI/UX Design.",
                image: "/assets/images/proker/workshop.jpg"
            }
        ]
    },
    8: {
        id: 8,
        nama_singkat: "Senat",
        nama_department: "Senat",
        logo: senatLogo,
        deskripsi: "Fokus pada penguatan internal organisasi dan keharmonisan antar anggota.",
        tupoksi: ["Meningkatkan bonding anggota", "Evaluasi internal"],
        program_kerja: []
    },
};