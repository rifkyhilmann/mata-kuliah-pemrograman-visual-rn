import { warna } from "@/constants/theme";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
    return (
        <View style={s.container}>
            <Text style={s.teks}>Halaman tidak ditemukan.</Text>
            <Link href="/" style={s.link}>
                Kembali ke Katalog
            </Link>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
    teks: { color: warna.teks },
    link: { color: "#2563eb", fontWeight: "bold" },
});
