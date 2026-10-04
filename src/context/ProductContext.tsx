import { DataProduk } from "@/data/product";
import { ProdukTypes } from "@/types/product";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type Data = Omit<ProdukTypes, "id">;

type Ctx = {
    produk: ProdukTypes[];
    daftarKategori: string[];
    tambah: (d: Data) => Promise<void>;
    ubah: (id: string, d: Data) => Promise<void>;
};

const ProductContext = createContext<Ctx | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [produk, setProduk] = useState<ProdukTypes[]>(DataProduk);

    const daftarKategori = useMemo(
        () => ["Semua", ...new Set(produk.map((p) => p.kategori))],
        [produk],
    );

    const tambah = async (d: Data) =>
        setProduk((p) => [{ ...d, id: Date.now().toString() }, ...p]);

    const ubah = async (id: string, d: Data) =>
        setProduk((p) => p.map((x) => (x.id === id ? { ...x, ...d } : x)));

    return (
        <ProductContext.Provider value={{ produk, daftarKategori, tambah, ubah }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduk() {
    const c = useContext(ProductContext);
    if (!c) throw new Error("useProduk harus dipakai di dalam ProductProvider");
    return c;
}
