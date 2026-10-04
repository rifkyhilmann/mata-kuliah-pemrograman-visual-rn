import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";
import { warna } from "@/constants/theme";
import { useProduk } from "@/context/ProductContext";
import { formatRupiah } from "@/utils/formatCurrency";

export default function DetailProduk() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { produk } = useProduk();
    const router = useRouter();

    const item = produk.find((p) => p.id === id);

    if (!item) {
        return (
            <View style={s.tengah}>
                <Text>Produk tidak ditemukan.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={s.isi}>
            <Image source={{ uri: item.gambar }} style={s.gambar} resizeMode="contain" />
            <Text style={s.kategori}>{item.kategori}</Text>
            <Text style={s.nama}>{item.nama}</Text>
            <Text style={s.harga}>{formatRupiah(item.harga)}</Text>
            <Text style={s.stok}>Stok: {item.stok}</Text>
            <Text style={s.deskripsi}>{item.deskripsi}</Text>
            <Button
                label="Edit Produk"
                varian="garis"
                onPress={() => {
                    router.push({
                        pathname: "/produk/form",
                        params: {
                            id: item.id,
                        },
                    });
                }}
            />
        </ScrollView>
    );
}

const s = StyleSheet.create({
    tengah: { flex: 1, alignItems: "center", justifyContent: "center" },
    isi: { padding: 20, gap: 8 },
    gambar: { width: "100%", aspectRatio: 1, backgroundColor: "#fff", borderRadius: 12 },
    kategori: { color: warna.teksRedup, textTransform: "uppercase", fontSize: 12, marginTop: 8 },
    nama: { fontSize: 22, fontWeight: "bold", color: warna.teks },
    harga: { fontSize: 20, fontWeight: "bold", color: warna.primer },
    stok: { color: warna.teksRedup },
    deskripsi: { lineHeight: 22, marginVertical: 8 },
});
