import { useState } from 'react';

type Galat<T> = Partial<Record<keyof T, string>>;
type Sentuh<T> = Partial<Record<keyof T, boolean>>;

export function useForm<T extends Record<string, string>>(
  awal: T,
  validasi: (nama: keyof T, nilai: string, data: T) => string
) {
    const [nilai, setNilai] = useState<T>(awal);
    const [galat, setGalat] = useState<Galat<T>>({});
    const [sentuh, setSentuh] = useState<Sentuh<T>>({});

    const hitung = (data: T, daftarSentuh: Sentuh<T>) => {
        const hasil: Galat<T> = {};
        (Object.keys(data) as (keyof T)[]).forEach((k) => {
        if (daftarSentuh[k]) {
            const pesan = validasi(k, data[k], data);
            if (pesan) hasil[k] = pesan;
        }
        });
        return hasil;
    };

    const ubah = (nama: keyof T, v: string, langsung = false) => {
        const data = { ...nilai, [nama]: v } as T;
        const s = langsung ? { ...sentuh, [nama]: true } : sentuh;
        setNilai(data);
        setSentuh(s);
        setGalat(hitung(data, s));
    };

    const blur = (nama: keyof T) => {
        const s = { ...sentuh, [nama]: true };
        setSentuh(s);
        setGalat(hitung(nilai, s));
    };

    const validasiSemua = () => {
        const s = {} as Sentuh<T>;
        (Object.keys(nilai) as (keyof T)[]).forEach((k) => {
        s[k] = true;
        });
        const g = hitung(nilai, s);
        setSentuh(s);
        setGalat(g);
        return Object.keys(g).length === 0;
    };

    const error = (nama: keyof T) => galat[nama];

    return { nilai, ubah, blur, validasiSemua, error };
}