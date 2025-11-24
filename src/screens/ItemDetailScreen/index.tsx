import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useApp, useTheme } from "../../contexts";
import { FormInput } from "../../components";
import { createItem, updateItem, getItem } from "../../services/api";
import {
  ItemCategory,
  CreateItemPayload,
  UpdateItemPayload,
} from "../../types";
import { getErrorMessage } from "../../utils/errorHandler";

type ItemDetailRouteParams = {
  itemId?: string;
};

export default function ItemDetailScreen() {
  const route =
    useRoute<RouteProp<{ params: ItemDetailRouteParams }, "params">>();
  const navigation = useNavigation();
  const { user, reloadItems } = useApp();
  const { theme } = useTheme();

  const itemId = route.params?.itemId;
  const isEditMode = !!itemId;

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ItemCategory>("CASA");
  const [unit, setUnit] = useState("");
  const [quantityTotal, setQuantityTotal] = useState("");
  const [dailyConsumption, setDailyConsumption] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [leadTimeDays, setLeadTimeDays] = useState("");
  const [needsPrescription, setNeedsPrescription] = useState(false);
  const [prescriptionLeadDays, setPrescriptionLeadDays] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const loadItem = useCallback(async () => {
    if (!itemId) return;

    try {
      const item = await getItem(itemId);
      setName(item.name);
      setCategory(item.category);
      setUnit(item.unit);
      setQuantityTotal(item.quantityTotal.toString());
      setDailyConsumption(item.dailyConsumption.toString());
      setStartDate(item.startDate.split("T")[0]);
      setLeadTimeDays(item.leadTimeDays.toString());
      setNeedsPrescription(item.needsPrescription);
      setPrescriptionLeadDays(item.prescriptionLeadDays?.toString() || "");
    } catch (error) {
      console.error("Error loading item:", error);
      Alert.alert("Erro", "Não foi possível carregar o item");
    }
  }, [itemId]);

  useEffect(() => {
    if (isEditMode) {
      loadItem();
    }
  }, [isEditMode, loadItem]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!unit.trim()) newErrors.unit = "Unidade é obrigatória";
    if (!quantityTotal || parseFloat(quantityTotal) <= 0) {
      newErrors.quantityTotal = "Quantidade deve ser maior que zero";
    }
    if (!dailyConsumption || parseFloat(dailyConsumption) <= 0) {
      newErrors.dailyConsumption = "Consumo diário deve ser maior que zero";
    }
    if (!startDate) newErrors.startDate = "Data de início é obrigatória";
    if (!leadTimeDays || parseInt(leadTimeDays) < 0) {
      newErrors.leadTimeDays = "Lead time deve ser zero ou maior";
    }
    if (
      needsPrescription &&
      (!prescriptionLeadDays || parseInt(prescriptionLeadDays) < 0)
    ) {
      newErrors.prescriptionLeadDays =
        "Dias de antecedência da receita deve ser zero ou maior";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !user) return;

    setIsLoading(true);

    try {
      const payload = {
        name: name.trim(),
        category,
        unit: unit.trim(),
        quantityTotal: parseFloat(quantityTotal),
        dailyConsumption: parseFloat(dailyConsumption),
        startDate: `${startDate}T00:00:00.000Z`,
        leadTimeDays: parseInt(leadTimeDays),
        needsPrescription,
        prescriptionLeadDays: needsPrescription
          ? parseInt(prescriptionLeadDays)
          : null,
      };

      if (isEditMode && itemId) {
        await updateItem(itemId, payload as UpdateItemPayload);
        Alert.alert("Sucesso", "Item atualizado com sucesso!");
      } else {
        await createItem({
          ...payload,
          userId: user.id,
        } as CreateItemPayload);
        Alert.alert("Sucesso", "Item criado com sucesso!");
      }

      await reloadItems();
      navigation.goBack();
    } catch (error: any) {
      console.error("Error saving item:", error);
      Alert.alert("Erro", getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            {isEditMode ? "Editar Item" : "Novo Item"}
          </Text>
        </View>

        <FormInput
          label="Nome *"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Ração Golden para Gatos"
          error={errors.name}
        />

        <View style={styles.pickerContainer}>
          <Text
            style={[styles.pickerLabel, { color: theme.colors.textPrimary }]}
          >
            Categoria *
          </Text>
          <View
            style={[styles.picker, { backgroundColor: theme.colors.surface }]}
          >
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
              style={{ color: theme.colors.textPrimary }}
              dropdownIconColor={theme.colors.textPrimary}
            >
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

        <FormInput
          label="Unidade *"
          value={unit}
          onChangeText={setUnit}
          placeholder="Ex: sachê, comprimido, kg, ml"
          error={errors.unit}
        />

        <FormInput
          label="Quantidade total do lote *"
          value={quantityTotal}
          onChangeText={setQuantityTotal}
          placeholder="0"
          keyboardType="numeric"
          error={errors.quantityTotal}
        />

        <FormInput
          label="Consumo diário *"
          value={dailyConsumption}
          onChangeText={setDailyConsumption}
          placeholder="0"
          keyboardType="numeric"
          error={errors.dailyConsumption}
        />

        <FormInput
          label="Data de início *"
          value={startDate}
          onChangeText={setStartDate}
          placeholder="YYYY-MM-DD"
          error={errors.startDate}
        />

        <FormInput
          label="Lead time em dias *"
          value={leadTimeDays}
          onChangeText={setLeadTimeDays}
          placeholder="0"
          keyboardType="numeric"
          error={errors.leadTimeDays}
        />

        <View style={styles.switchContainer}>
          <Text
            style={[styles.switchLabel, { color: theme.colors.textPrimary }]}
          >
            Requer receita controlada
          </Text>
          <Switch
            value={needsPrescription}
            onValueChange={setNeedsPrescription}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        {needsPrescription && (
          <FormInput
            label="Dias de antecedência da receita *"
            value={prescriptionLeadDays}
            onChangeText={setPrescriptionLeadDays}
            placeholder="0"
            keyboardType="numeric"
            error={errors.prescriptionLeadDays}
          />
        )}

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.colors.primary },
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Salvando..." : isEditMode ? "Atualizar" : "Criar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  picker: {
    borderRadius: 8,
    overflow: "hidden",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
