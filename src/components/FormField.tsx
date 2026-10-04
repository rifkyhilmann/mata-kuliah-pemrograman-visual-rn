import { warna } from "@/constants/theme";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  wajib?: boolean;
  error?: string;
};

export default function FormField({
  label,
  wajib,
  error,
  style,
  ...props
}: Props) {
  return (
    <View style={s.container}>
      <Text style={s.label}>
        {label}
        {wajib ? " *" : ""}
      </Text>

      <TextInput
        accessibilityLabel={label}
        placeholderTextColor="#9ca3af"
        style={[s.input, error ? s.inputError : null, style]}
        {...props}
      />

      {error ? (
        <Text accessibilityRole="alert" style={s.error}>
          ⚠ {error}
        </Text>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: warna.teks,
  },

  input: {
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 8,
    padding: 12,
    minHeight: 48,
    backgroundColor: "#fff",
    fontSize: 15,
  },

  inputError: {
    borderColor: warna.bahaya,
  },

  error: {
    color: warna.bahaya,
    marginTop: 4,
  },
});
