// app/index.tsx
import ProductCard from "@/components/ProductCard";
import { jarak, warna } from "@/constants/theme";
import { DataProduk } from "@/data/product";
import { useGrid } from "@/hooks/useGrid";
import { FlatList, StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import KategoriChips from '@/components/KategoriChips';

import ProductForm from '@/components/ProductForm';
import Button from '@/components/Button';
import { useProduk } from '@/context/ProductContext';
import { ProdukTypes } from '@/types/product';

const daftarKategori = ['Semua', ...new Set(DataProduk.map((p) => p.kategori))];

export default function Index() {
    const { kolom, lebar } = useGrid();
    
    // Ambil state dan function dari ProductContext
    const { produk, daftarKategori, tambah, ubah } = useProduk();

    const [query, setQuery] = useState('');
    const [kataKunci, setKataKunci] = useState('');
    const [kategori, setKategori] = useState('Semua');

    // State untuk kontrol Modal Form
    const [terbuka, setTerbuka] = useState(false);
    const [dipilih, setDipilih] = useState<ProdukTypes | undefined>();

    const bukaForm = (id?: string) => {
        setDipilih(produk.find((p) => p.id === id));
        setTerbuka(true);
    };

    // Debounce 300 ms
    useEffect(() => {
        const t = setTimeout(() => setKataKunci(query.trim().toLowerCase()), 300);
        return () => clearTimeout(t);
    }, [query]);

    // Filter produk dihitung ulang berdasarkan data produk dari Context
    const hasil = useMemo(
        () =>
            produk.filter(
                (p) =>
                    (kategori === 'Semua' || p.kategori === kategori) &&
                    p.nama.toLowerCase().includes(kataKunci)
            ),
        [produk, kategori, kataKunci]
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
                data={hasil}
                numColumns={kolom}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={{ gap: jarak.sm }}
                contentContainerStyle={{ padding: jarak.md, gap: jarak.sm, paddingBottom: 80 }}
                renderItem={({ item }) => (
                    <ProductCard 
                        produk={item} 
                        lebar={lebar} 
                        onPress={() => bukaForm(item.id)} 
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Belum ada produk.</Text>
                }
                showsVerticalScrollIndicator={false}
            />

            {/* Tombol Floating Action (Tambah Produk) */}
            <Pressable style={styles.fab} onPress={() => bukaForm()}>
                <Text style={styles.fabIcon}>＋</Text>
            </Pressable>

            {/* Modal Tambah / Edit Produk */}
            <Modal visible={terbuka} animationType="slide" onRequestClose={() => setTerbuka(false)}>
                <SafeAreaView style={{ flex: 1, backgroundColor: warna.latar }}>
                    <ProductForm
                        key={dipilih?.id ?? 'baru'}
                        initial={dipilih}
                        kategoriList={daftarKategori.filter((k) => k !== 'Semua')}
                        labelTombol={dipilih ? 'Simpan Perubahan' : 'Tambah Produk'}
                        onSubmit={async (data) => {
                            if (dipilih) {
                                await ubah(dipilih.id, data);
                            } else {
                                await tambah(data);
                            }
                            setTerbuka(false);
                        }}
                    />
                    <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                        <Button varian="garis" label="Batal" onPress={() => setTerbuka(false)} />
                    </View>
                </SafeAreaView>
            </Modal>
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
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: warna.primer,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fabIcon: {
        color: '#fff',
        fontSize: 28,
        lineHeight: 30,
    },
});
