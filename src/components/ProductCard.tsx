import { warna } from "@/constants/theme";
import { ProdukTypes } from "@/types/product";
import { formatRupiah } from "@/utils/formatCurrency";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  produk: ProdukTypes;
  lebar: number;
  onPress?: (id: string) => void;
};

export default function ProductCard({ produk, lebar, onPress }: Props) {
    return (
        <Pressable
            onPress={() => onPress?.(produk.id)}
            accessibilityRole="button"
            accessibilityLabel={`${produk.nama}, ${formatRupiah(produk.harga)}`}
            style={({ pressed }) => [
                s.kartu,
                { width: lebar },
                pressed && { opacity: 0.85 },
            ]}
        >
            <View style={s.wadahGambar}>
                <Image
                source={{ uri: produk.gambar }}
                style={s.gambar}
                resizeMode="cover"
                />
            </View>
            <View style={s.info}>
                <Text style={s.kategori}>{produk.kategori}</Text>
                <Text style={s.nama} numberOfLines={2}>
                {produk.nama}
                </Text>
                <Text style={s.harga}>{formatRupiah(produk.harga)}</Text>
            </View>
        </Pressable>
    );
}

const s = StyleSheet.create({
    kartu: {
        backgroundColor: warna.kartu,
        borderRadius: 12,
        overflow: "hidden",
        ...Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
        },
        android: { elevation: 2 },
        }),
    },
    wadahGambar: {
        aspectRatio: 1,
        backgroundColor: "#fff",
    },
    gambar: {
        flex: 1,
    },
    info: {
        padding: 10,
        gap: 2,
    },
    kategori: {
        fontSize: 11,
        color: warna.teksRedup,
        textTransform: "uppercase",
    },
    nama: {
        fontSize: 14,
        fontWeight: "600",
        color: warna.teks,
        minHeight: 36,
    },
    harga: {
        fontSize: 15,
        fontWeight: "bold",
        color: warna.primer,
        marginTop: 4,
    },
});
