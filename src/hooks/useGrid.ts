import { useWindowDimensions } from 'react-native';
import { jarak } from '@/constants/theme';

export function useGrid() {
  const { width } = useWindowDimensions();

  // Menentukan jumlah kolom berdasarkan lebar layar
  const kolom = width >= 900 ? 4 : width >= 600 ? 3 : 2;

  // Menghitung lebar dinamis tiap kartu produk
  const lebar = (width - jarak.md * 2 - jarak.sm * (kolom - 1)) / kolom;

  return { kolom, lebar };
}