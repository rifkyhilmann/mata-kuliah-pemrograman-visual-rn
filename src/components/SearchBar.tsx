import { warna } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
    return (
        <View style={s.kotak}>
            <Ionicons name="search" size={18} color={warna.teksRedup} />
            <TextInput
                style={s.input}
                value={value}
                onChangeText={onChangeText}
                placeholder="Cari produk..."
                returnKeyType="search"
                autoCorrect={false}
                accessibilityLabel="Cari produk"
            />
            {value.length > 0 && (
                <Pressable
                    onPress={() => onChangeText("")}
                    hitSlop={8}
                    accessibilityLabel="Hapus pencarian"
                >
                    <Ionicons name="close-circle" size={18} color={warna.teksRedup} />
                </Pressable>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    kotak: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 12,
        minHeight: 44,
        borderWidth: 1,
        borderColor: warna.garis,
    },
    input: {
        flex: 1,
        fontSize: 15,
    },
});
