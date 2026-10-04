// app/index.tsx
import ProductCard from "@/components/ProductCard";
import { jarak, warna } from "@/constants/theme";
import { DataProduk } from "@/data/product";
import { useGrid } from "@/hooks/useGrid";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import KategoriChips from '@/components/KategoriChips';

const daftarKategori = ['Semua', ...new Set(DataProduk.map((p) => p.kategori))];

export default function Index() {
    const { kolom, lebar } = useGrid();
    const [query, setQuery] = useState('');
    const [kataKunci, setKataKunci] = useState('');
    const [kategori, setKategori] = useState('Semua');

    // Debounce 300 ms: Membantu performa agar filter tidak berjalan pada setiap ketikan tombol
    useEffect(() => {
        const t = setTimeout(() => setKataKunci(query.trim().toLowerCase()), 300);
        return () => clearTimeout(t);
    }, [query]);

    // Filter produk dihitung ulang hanya saat kategori atau kataKunci berubah
    const hasil = useMemo(
        () =>
        DataProduk.filter(
            (p) =>
            (kategori === 'Semua' || p.kategori === kategori) &&
            p.nama.toLowerCase().includes(kataKunci)
        ),
        [kategori, kataKunci]
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.atas}>
                <SearchBar value={query} onChangeText={setQuery} />
                <KategoriChips daftar={daftarKategori} aktif={kategori} onPilih={setKategori} />
                <Text style={styles.jumlah}>{hasil.length} produk</Text>
            </View>

            <FlatList
                key={kolom}
                style={{ backgroundColor: warna.latar }}
                data={DataProduk}
                numColumns={kolom}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={{ gap: jarak.sm }}
                contentContainerStyle={{ padding: jarak.md, gap: jarak.sm }}
                renderItem={({ item }) => <ProductCard produk={item} lebar={lebar} />}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Belum ada produk.</Text>
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: warna.latar,
    },
    header: {
        paddingHorizontal: jarak.md,
        paddingVertical: jarak.sm + 4,
        backgroundColor: warna.kartu,
        borderBottomWidth: 1,
        borderBottomColor: warna.garis,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: warna.teks,
    },
    headerSubtitle: {
        fontSize: 12,
        color: warna.teksRedup,
        marginTop: 2,
    },
    emptyText: {
        textAlign: "center",
        color: warna.teksRedup,
        marginTop: 20,
    },
    atas: { 
        paddingHorizontal: jarak.md,
        paddingTop: jarak.sm,
        paddingBottom: 0 
    },
    jumlah: { 
        color: warna.teksRedup, 
        marginTop: 4 
    },
});
