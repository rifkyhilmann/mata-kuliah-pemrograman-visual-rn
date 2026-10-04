import { Stack } from "expo-router";
import { ProductProvider } from '@/context/ProductContext';

export default function RootLayout() {
    return (
        <ProductProvider>
            <Stack >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Daftar Produk",
                    }}
                />
            </Stack>
        </ProductProvider>
    );
}