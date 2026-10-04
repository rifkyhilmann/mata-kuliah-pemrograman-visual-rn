import { Stack } from "expo-router";
import { ProductProvider } from '@/context/ProductContext';
import { warna } from '@/constants/theme';

export default function RootLayout() {
    return (
        <ProductProvider>
            <Stack  screenOptions={{ headerTintColor: warna.primer }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="produk/[id]" options={{ title: 'Detail Produk' }} />
                <Stack.Screen name="produk/form" options={{ title: 'Form Produk' }} />
            </Stack>
        </ProductProvider>
    );
}