
export type FormProduk = {
    nama: string;
    harga: string;
    stok: string;
    kategori: string;
    deskripsi: string;
    gambar: string;
};

export function validateProduk(nama: keyof FormProduk, value: string): string {
    const v = value.trim();
    switch (nama) {
        case 'nama':
            if (!v) return 'Nama produk wajib diisi';
            if (v.length < 3) return 'Nama minimal 3 karakter';
            return '';
        case 'harga':
            if (!v) return 'Harga wajib diisi';
            if (!/^\d+$/.test(v)) return 'Harga harus berupa angka';
            if (Number(v) <= 0) return 'Harga harus lebih dari 0';
            return '';
        case 'stok':
            if (!v) return 'Stok wajib diisi';
            if (!/^\d+$/.test(v)) return 'Stok harus berupa angka bulat (0 atau lebih)';
            return '';
        case 'kategori':
            return v ? '' : 'Pilih salah satu kategori';
        case 'deskripsi':
            return v.length < 10 ? 'Deskripsi minimal 10 karakter' : '';
        case 'gambar':
            return v && !/^https?:\/\/\S+$/.test(v)
                ? 'URL gambar harus diawali http:// atau https://'
                : '';
    }
    return '';
}