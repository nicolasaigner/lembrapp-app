import React from "react";
import { View, Text } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../types";
import { styles } from "./styles";
import { useAppContext } from "../../contexts/AppContext";
import { MealDTO } from "../../services/api";

type Props = DrawerScreenProps<RootDrawerParamList, "MealDetail">;

const MealDetailScreen: React.FC<Props> = ({ route }) => {
  const { meal } = route.params; // desestruturação -> comunicação direta/indireta
  const { theme } = useAppContext();

  const keys = Object.keys(meal);

  function mealsText() {
    return keys.map((key: string) => {
      const value = meal[key] as string | number | undefined;

      console.log("Key", key, "Value", value);

      return (
        <Text style={[styles.text, { color: theme.textSecondary }]}>
          <Text style={styles.label}>{key}: </Text>
          {value || "N/A"}
        </Text>
      );
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Detalhe da Refeição
      </Text>

      {mealsText()}

      {/*<Text style={[styles.text, { color: theme.textSecondary }]}>
                <Text style={styles.label}>Nome: </Text>
                {meal.name}
            </Text>*/}

      {/*<Text style={[styles.text, { color: theme.textSecondary }]}>*/}
      {/*    <Text style={styles.label}>Categoria: </Text>*/}
      {/*    {meal.}*/}
      {/*</Text>*/}

      {/*<Text style={[styles.text, { color: theme.textSecondary }]}>
                <Text style={styles.label}>Calorias: </Text>
                {meal.calories} kcal
            </Text>*/}

      <Text style={[styles.text, { color: theme.textLight }]}>
        Este exemplo mostra passagem de parâmetros via navigation (objeto
        route), com desestruturação no componente.
      </Text>
    </View>
  );
};

export default MealDetailScreen;
