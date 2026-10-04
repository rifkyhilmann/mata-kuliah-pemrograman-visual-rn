import ProductForm from "@/components/ProductForm";
import { useProduk } from "@/context/ProductContext";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function FormProduk() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const { produk, daftarKategori, tambah, ubah } = useProduk();
    const router = useRouter();

    const edit = id ? produk.find((p) => p.id === id) : undefined;

    return (
        <>
            <Stack.Screen options={{ title: edit ? "Edit Produk" : "Tambah Produk" }} />
            <ProductForm
                key={edit?.id ?? "baru"}
                initial={edit}
                kategoriList={daftarKategori}
                labelTombol={edit ? "Simpan Perubahan" : "Tambah Produk"}
                onSubmit={async (data) => {
                    if (edit) {
                        await ubah(edit.id, data);
                    } else {
                        await tambah(data);
                    }
                    router.back();
                }}
            />
        </>
    );
}
