import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../types";
import { styles } from "./styles";
import { api, MealDTO, MealListDTO } from "../../services/api";
import { Picker } from "@react-native-picker/picker";
import { useAppContext } from "../../contexts/AppContext";

type Props = DrawerScreenProps<RootDrawerParamList, "Meals">;

const MealsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useAppContext();
  const [meals, setMeals] = useState<MealListDTO>({ data: [] });
  const [loading, setLoading] = useState(false);
  const [selectedAlimento, setSelectedAlimento] = useState<string>("TODOS");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await api.listMeals();
        console.log("Data", data);
        setMeals(data);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar refeições");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const alimentos = useMemo(() => {
    const unique = Array.from(
      new Set(meals.data.map((meal) => `${meal.calories} kcal`)),
    );
    // const unique = Array.from(new Set());
    return ["TODOS", ...unique];
  }, [meals]);

  const filteredMeals = useMemo(() => {
    if (selectedAlimento === "TODOS") {
      return meals.data;
    }
    return meals.data.filter((m) => `${m.calories} kcal` === selectedAlimento);
  }, [meals, selectedAlimento]);

  function handlePressMeal(meal: MealDTO) {
    // Passagem de parâmetros via navigation (comunicação direta)
    navigation.navigate("MealDetail", { meal });
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Refeições (GET /meals)
      </Text>

      <View
        style={[
          styles.pickerContainer,
          { borderColor: theme.border, backgroundColor: theme.card },
        ]}
      >
        <Picker
          selectedValue={selectedAlimento}
          onValueChange={(value) => setSelectedAlimento(value)}
          style={{ color: theme.text }}
        >
          {alimentos.map((alimento) => (
            <Picker.Item
              key={alimento}
              label={alimento === "TODOS" ? "Todos Alimentos" : alimento}
              value={alimento}
            />
          ))}
        </Picker>
      </View>

      {loading && <ActivityIndicator size="large" color={theme.primary} />}

      {error && (
        <Text style={[styles.emptyText, { color: theme.error }]}>{error}</Text>
      )}

      {!loading && !error && filteredMeals.length === 0 && (
        <Text style={[styles.emptyText, { color: theme.textLight }]}>
          Nenhuma refeição encontrada.
        </Text>
      )}

      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.itemCard,
              {
                borderColor: theme.border,
                backgroundColor: theme.surface,
              },
            ]}
            onPress={() => handlePressMeal(item)}
          >
            <Text style={[styles.itemName, { color: theme.text }]}>
              {item.name} (Porção 300g)
            </Text>
            {/*<Text style={[styles.itemCategory, { color: theme.textLight }]}>Categoria: {item.category}</Text>*/}
            <Text style={[styles.itemCalories, { color: theme.textSecondary }]}>
              Calorias: {item.calories} kcal | Carboidratos:{" "}
              {item.carbohydrates} g
            </Text>
            <Text style={[styles.itemCalories, { color: theme.textSecondary }]}>
              Proteínas: {item.protein} g | Gorduras: {item.fat} g
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MealsScreen;
