import { ProdukTypes } from "@/types/product";
import { formatRupiah } from "@/utils/formatCurrency";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProductCard({ produk }: { produk: ProdukTypes }) {
    return (
        <View style={styles.kartu}>
            <Image source={{ uri: produk.gambar }} style={styles.gambar} />
            <View style={styles.info}>
                <Text style={styles.nama}>{produk.nama}</Text>
                <Text style={styles.kategori}>{produk.kategori}</Text>
                <Text style={styles.harga}>{formatRupiah(produk.harga)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    kartu: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        gap: 12,
    },
    gambar: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: "#e5e7eb",
    },
    info: { 
        flex: 1, 
        justifyContent: "center" 
    },
    nama: { 
        fontSize: 16, 
        fontWeight: "600" 
    },
    kategori: { 
        color: "#6b7280", 
        marginTop: 2 
    },
    harga: { 
        color: "#2563eb", 
        fontWeight: "bold", 
        marginTop: 6 
    },
});
