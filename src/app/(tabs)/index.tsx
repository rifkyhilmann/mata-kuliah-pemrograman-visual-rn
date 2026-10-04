import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import KategoriChips from "@/components/KategoriChips";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { jarak, warna } from "@/constants/theme";
import { useProduk } from "@/context/ProductContext";
import { useGrid } from "@/hooks/useGrid";

export default function Index() {
    const router = useRouter();
    const { produk, daftarKategori } = useProduk();
    const { kolom, lebar } = useGrid();

    const [query, setQuery] = useState("");
    const [kataKunci, setKataKunci] = useState("");
    const [kategori, setKategori] = useState("Semua");

    useEffect(() => {
        const t = setTimeout(() => setKataKunci(query.trim().toLowerCase()), 300);
        return () => clearTimeout(t);
    }, [query]);

    const hasil = useMemo(
        () =>
            produk.filter(
                (p) =>
                    (kategori === "Semua" || p.kategori === kategori) &&
                    p.nama.toLowerCase().includes(kataKunci)
            ),
        [produk, kategori, kataKunci]
    );

    return (
        <View style={s.layar}>
            <View style={s.atas}>
                <SearchBar value={query} onChangeText={setQuery} />
                <KategoriChips daftar={daftarKategori} aktif={kategori} onPilih={setKategori} />
                <Text style={s.jumlah}>{hasil.length} produk</Text>
            </View>

            <FlatList
                key={kolom}
                data={hasil}
                numColumns={kolom}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={kolom > 1 ? { gap: jarak.sm } : undefined}
                contentContainerStyle={{
                    padding: jarak.md,
                    gap: jarak.sm,
                    paddingBottom: 96,
                }}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <ProductCard
                        produk={item}
                        lebar={lebar}
                        onPress={() =>
                            router.push({
                                pathname: "/produk/[id]",
                                params: {
                                    id: item.id,
                                },
                            })
                        }
                    />
                )}
                ListEmptyComponent={<Text style={s.kosong}>Produk tidak ditemukan.</Text>}
            />

            <Pressable
                style={s.fab}
                accessibilityLabel="Tambah produk"
                onPress={() =>
                    router.push({
                        pathname: "/produk/form",
                    })
                }
            >
                <Text style={s.fabTeks}>＋</Text>
            </Pressable>
        </View>
    );
}

const s = StyleSheet.create({
    layar: { flex: 1, backgroundColor: warna.latar },
    atas: { padding: jarak.md, paddingBottom: 0 },
    jumlah: { color: warna.teksRedup, marginTop: 4 },
    kosong: { textAlign: "center", color: warna.teksRedup, marginTop: 40 },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: warna.primer,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    fabTeks: { color: "#fff", fontSize: 28, marginTop: -2 },
});
