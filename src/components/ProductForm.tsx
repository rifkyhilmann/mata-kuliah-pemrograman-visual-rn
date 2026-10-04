// src/components/ProductForm.tsx
import { warna } from "@/constants/theme";
import { useForm } from "@/hooks/useForm";
import { ProdukTypes } from "@/types/product"; 
import { FormProduk, validateProduk } from "@/utils/validators";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import FormField from "./FormField";
import KategoriChips from "./KategoriChips";
import Button from '@/components/Button';

type Props = {
  initial?: ProdukTypes;
  kategoriList: string[];
  labelTombol: string;
  onSubmit: (data: Omit<ProdukTypes, "id">) => Promise<void>;
};

const GAMBAR_DEFAULT = "https://picsum.photos/seed/produk/400/400";

export default function ProductForm({
  initial,
  kategoriList,
  labelTombol,
  onSubmit,
}: Props) {
  const f = useForm<FormProduk>(
    {
      nama: initial?.nama ?? "",
      harga: initial ? String(initial.harga) : "",
      stok: initial ? String(initial.stok) : "",
      kategori: initial?.kategori ?? "",
      deskripsi: initial?.deskripsi ?? "",
      gambar: initial?.gambar ?? "",
    },
    validateProduk,
  );

  const [loading, setLoading] = useState(false);
  const [galatServer, setGalatServer] = useState("");

  const kirim = async () => {
    if (!f.validasiSemua()) return;
    setLoading(true);
    setGalatServer("");
    try {
      await onSubmit({
        nama: f.nilai.nama.trim(),
        harga: Number(f.nilai.harga),
        stok: Number(f.nilai.stok),
        kategori: f.nilai.kategori,
        deskripsi: f.nilai.deskripsi.trim(),
        gambar: f.nilai.gambar.trim() || GAMBAR_DEFAULT,
      });
    } catch {
      setGalatServer("Data gagal disimpan. Periksa koneksi lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const field = (nama: keyof FormProduk) => ({
    value: f.nilai[nama],
    onChangeText: (v: string) => f.ubah(nama, v),
    onBlur: () => f.blur(nama),
    error: f.error(nama),
    editable: !loading,
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <FormField
          label="Nama Produk"
          wajib
          placeholder="Contoh: Kopi Arabika"
          {...field("nama")}
        />
        <FormField
          label="Harga (Rp)"
          wajib
          keyboardType="numeric"
          placeholder="35000"
          {...field("harga")}
        />
        <FormField
          label="Stok"
          wajib
          keyboardType="numeric"
          placeholder="50"
          {...field("stok")}
        />

        <Text style={s.label}>Kategori *</Text>
        <KategoriChips
          daftar={kategoriList}
          aktif={f.nilai.kategori}
          onPilih={(k) => f.ubah("kategori", k, true)}
        />
        {f.error("kategori") ? (
          <Text style={s.error}>{`⚠ ${f.error("kategori")}`}</Text>
        ) : null}

        <FormField
          label="Deskripsi"
          wajib
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: "top" }}
          placeholder="Jelaskan produk"
          {...field("deskripsi")}
        />
        <FormField
          label="URL Gambar (opsional)"
          keyboardType="url"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="https://..."
          {...field("gambar")}
        />

        {galatServer ? (
          <Text style={[s.error, { marginBottom: 12 }]}>{galatServer}</Text>
        ) : null}
        <Button label={labelTombol} onPress={kirim} loading={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  label: { fontWeight: "600", color: warna.teks, marginBottom: 8 },
  error: { color: warna.bahaya, marginBottom: 12 },
});
