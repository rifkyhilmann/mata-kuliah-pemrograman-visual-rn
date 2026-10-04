import { warna } from "@/constants/theme";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

type Props = {
    daftar: string[];
    aktif: string;
    onPilih: (k: string) => void;
};

export default function KategoriChips({ daftar, aktif, onPilih }: Props) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingVertical: 8 }}
            keyboardShouldPersistTaps="handled"
        >
            {daftar.map((k) => (
                <Pressable
                    key={k}
                    onPress={() => onPilih(k)}
                    accessibilityState={{ selected: k === aktif }}
                    style={[s.chip, k === aktif && s.chipAktif]}
                >
                    <Text style={[s.teks, k === aktif && s.teksAktif]}>{k}</Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}

const s = StyleSheet.create({
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: warna.garis,
    },
    chipAktif: {
        backgroundColor: warna.primer,
        borderColor: warna.primer,
    },
    teks: {
        color: warna.teks,
    },
    teksAktif: {
        color: "#fff",
        fontWeight: "600",
    },
});
