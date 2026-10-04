import { jarak, warna } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function Profil() {
    return (
        <View style={s.container}>
            <Text style={s.judul}>Profil</Text>
            <Text style={s.subjudul}>Aplikasi Katalog Produk v1.0</Text>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, padding: jarak.lg, backgroundColor: warna.latar },
    judul: { fontSize: 22, fontWeight: "bold", color: warna.teks },
    subjudul: { marginTop: 8, color: warna.teksRedup },
});
