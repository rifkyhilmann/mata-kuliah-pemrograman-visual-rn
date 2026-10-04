import { FlatList, View, Text } from 'react-native';
import ProductCard from '@/components/ProductCard';
import { DataProduk } from '@/data/product';

export default function Index() {
    return (
        <FlatList
            style={{ backgroundColor: "#f3f4f6" }}
            contentContainerStyle={{ padding: 16 }}
            data={DataProduk}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard produk={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            ListEmptyComponent={<Text>Belum ada produk.</Text>}
        />
    );
}
