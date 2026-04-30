export const createEmptyCommitteeForm = () => ({
    nama: "",
    tanggalBuka: "",
    tanggalTutup: "",
    deskripsi: "",
    tanggal_pengumuman: "",
    link_grup_whatsapp: "",
    divisi: [""],
});

const toDateInputValue = (value) => {
    if (!value) return "";
    return String(value).slice(0, 10);
};

export const committeeToFormState = (committee) => ({
    nama: committee.nama ?? "",
    tanggalBuka: toDateInputValue(committee.tanggalBuka),
    tanggalTutup: toDateInputValue(committee.tanggalTutup),
    deskripsi: committee.deskripsi ?? "",
    tanggal_pengumuman: toDateInputValue(committee.tanggal_pengumuman),
    link_grup_whatsapp: committee.link_grup_whatsapp ?? "",
    divisi: (committee.divisis ?? []).map((divisi) => divisi.nama_divisi),
});

export const buildCommitteePayload = (form) => {
    const cleanDivisi = form.divisi.filter((divisi) => divisi.trim() !== "");

    return {
        payload: {
            nama: form.nama,
            tanggalBuka: form.tanggalBuka,
            tanggalTutup: form.tanggalTutup,
            deskripsi: form.deskripsi,
            tanggal_pengumuman: form.tanggal_pengumuman,
            link_grup_whatsapp: form.link_grup_whatsapp,
            divisi: cleanDivisi,
        },
        cleanDivisi,
    };
};
