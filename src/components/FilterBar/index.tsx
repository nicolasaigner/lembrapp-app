import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../contexts";
import { ItemCategory, ItemStatus } from "../../types";

interface FilterBarProps {
  category: string;
  status: string;
  search: string;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export default function FilterBar({
  category,
  status,
  search,
  onCategoryChange,
  onStatusChange,
  onSearchChange,
}: FilterBarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
        Filtros
      </Text>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text
            style={[styles.pickerLabel, { color: theme.colors.textSecondary }]}
          >
            Categoria
          </Text>
          <View
            style={[styles.picker, { backgroundColor: theme.colors.surface }]}
          >
            <Picker
              selectedValue={category}
              onValueChange={onCategoryChange}
              style={{ color: theme.colors.textPrimary }}
              dropdownIconColor={theme.colors.textPrimary}
            >
              <Picker.Item label="Todos" value="" />
              <Picker.Item label="Pet" value="PET" />
              <Picker.Item
                label="Medicamento Controlado"
                value="MEDICAMENTO_CONTROLADO"
              />
              <Picker.Item label="Medicamento" value="MEDICAMENTO" />
              <Picker.Item label="Casa" value="CASA" />
            </Picker>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Text
            style={[styles.pickerLabel, { color: theme.colors.textSecondary }]}
          >
            Status
          </Text>
          <View
            style={[styles.picker, { backgroundColor: theme.colors.surface }]}
          >
            <Picker
              selectedValue={status}
              onValueChange={onStatusChange}
              style={{ color: theme.colors.textPrimary }}
              dropdownIconColor={theme.colors.textPrimary}
            >
              <Picker.Item label="Todos" value="" />
              <Picker.Item label="Em dia" value="EM_DIA" />
              <Picker.Item label="Acabando" value="ACABANDO" />
              <Picker.Item label="Em falta" value="EM_FALTA" />
            </Picker>
          </View>
        </View>
      </View>

      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: theme.colors.surface,
            color: theme.colors.textPrimary,
            borderColor: theme.colors.border,
          },
        ]}
        placeholder="Buscar por nome..."
        placeholderTextColor={theme.colors.textSecondary}
        value={search}
        onChangeText={onSearchChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  pickerContainer: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  picker: {
    borderRadius: 8,
    overflow: "hidden",
  },
  searchInput: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
});
