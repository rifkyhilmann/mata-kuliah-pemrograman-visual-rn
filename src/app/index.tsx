// app/index.tsx
import ProductCard from "@/components/ProductCard";
import { jarak, warna } from "@/constants/theme";
import { DataProduk } from "@/data/product";
import { useGrid } from "@/hooks/useGrid";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const { kolom, lebar } = useGrid();

    return (
        <SafeAreaView style={styles.container}>
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
});
