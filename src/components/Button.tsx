import { warna } from "@/constants/theme";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  varian?: "primer" | "bahaya" | "garis";
  loading?: boolean;
  disabled?: boolean;
};

export default function Tombol({
  label,
  onPress,
  varian = "primer",
  loading = false,
  disabled = false,
}: Props) {
    const mati = disabled || loading;
    return (
        <Pressable
            onPress={onPress}
            disabled={mati}
            accessibilityRole="button"
            accessibilityState={{ disabled: mati }}
            style={({ pressed }) => [
                s.dasar,
                varian === "bahaya" && s.bahaya,
                varian === "garis" && s.garis,
                mati && { opacity: 0.6 },
                pressed && { opacity: 0.85 },
            ]}
        >
        {loading ? (
            <ActivityIndicator color={varian === "garis" ? warna.primer : "#fff"} />
        ) : (
            <Text style={[s.teks, varian === "garis" && { color: warna.primer }]}>
            {label}
            </Text>
        )}
        </Pressable>
    );
}

const s = StyleSheet.create({
    dasar: {
        backgroundColor: warna.primer,
        borderRadius: 8,
        minHeight: 48,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    bahaya: { backgroundColor: warna.bahaya },
    garis: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: warna.primer,
    },
    teks: { color: "#fff", fontWeight: "600" },
});
