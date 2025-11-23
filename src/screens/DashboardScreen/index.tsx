import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProps } from "../../navigation";
import { useApp, useTheme } from "../../contexts";
import { ItemCard, FormInput } from "../../components";
import { Item } from "../../types";
import { createPurchase } from "../../services/api";
import { getErrorMessage } from "../../utils/errorHandler";

export default function DashboardScreen() {
  const navigation = useNavigation<DrawerNavigationProps>();
  const { user, items, reloadItems } = useApp();
  const { theme } = useTheme();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await reloadItems();
    setIsRefreshing(false);
  };

  const handleItemPress = (item: Item) => {
    // Navigate to item detail - to be implemented with proper navigation params
    Alert.alert("Item", `Detalhes: ${item.name}`);
  };

  const handleQuickPurchase = (item: Item) => {
    setSelectedItem(item);
    setPurchaseQuantity("");
    setPurchaseDate(new Date().toISOString().split("T")[0]);
    setPurchaseModalVisible(true);
  };

  const handlePurchaseSubmit = async () => {
    if (!selectedItem || !purchaseQuantity) {
      Alert.alert("Erro", "Preencha a quantidade");
      return;
    }

    try {
      await createPurchase(selectedItem.id, {
        quantity: parseInt(purchaseQuantity, 10),
        date: purchaseDate,
      });

      setPurchaseModalVisible(false);
      Alert.alert("Sucesso", "Compra registrada com sucesso!");
      await reloadItems();
    } catch (error: any) {
      console.error("Error creating purchase:", error);
      Alert.alert("Erro", getErrorMessage(error));
    }
  };

  const emFaltaItems = items.filter((item) => item.status === "EM_FALTA");
  const acabandoItems = items.filter((item) => item.status === "ACABANDO");
  const emDiaItems = items.filter((item) => item.status === "EM_DIA");

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>
            Olá, {user?.name || "Usuário"}! 👋
          </Text>
          <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
            {currentDate}
          </Text>
        </View>

        {emFaltaItems.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.error }]}>
              ⚠️ Em Falta ({emFaltaItems.length})
            </Text>
            {emFaltaItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onPress={() => handleItemPress(item)}
                onQuickPurchasePress={() => handleQuickPurchase(item)}
              />
            ))}
          </View>
        )}

        {acabandoItems.length > 0 && (
          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.warning }]}
            >
              ⏰ Acabando ({acabandoItems.length})
            </Text>
            {acabandoItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onPress={() => handleItemPress(item)}
                onQuickPurchasePress={() => handleQuickPurchase(item)}
              />
            ))}
          </View>
        )}

        {emDiaItems.length > 0 && (
          <View style={styles.section}>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.success }]}
            >
              ✅ Em Dia ({emDiaItems.length})
            </Text>
            {emDiaItems.slice(0, 3).map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onPress={() => handleItemPress(item)}
              />
            ))}
            {emDiaItems.length > 3 && (
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={() => navigation.navigate("Items")}
              >
                <Text
                  style={[styles.seeMoreText, { color: theme.colors.primary }]}
                >
                  Ver todos os {emDiaItems.length} itens em dia
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {items.length === 0 && (
          <View style={styles.emptyState}>
            <Text
              style={[styles.emptyText, { color: theme.colors.textSecondary }]}
            >
              Nenhum item cadastrado ainda.
            </Text>
            <Text
              style={[styles.emptyText, { color: theme.colors.textSecondary }]}
            >
              Toque em "Novo Item" para começar!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Purchase Modal */}
      <Modal
        visible={purchaseModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPurchaseModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.card },
            ]}
          >
            <Text
              style={[styles.modalTitle, { color: theme.colors.textPrimary }]}
            >
              Registrar Compra
            </Text>
            <Text
              style={[
                styles.modalSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              {selectedItem?.name}
            </Text>

            <FormInput
              label="Quantidade"
              value={purchaseQuantity}
              onChangeText={setPurchaseQuantity}
              placeholder="0"
              keyboardType="numeric"
            />

            <FormInput
              label="Data"
              value={purchaseDate}
              onChangeText={setPurchaseDate}
              placeholder="YYYY-MM-DD"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: theme.colors.surface },
                ]}
                onPress={() => setPurchaseModalVisible(false)}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    { color: theme.colors.textPrimary },
                  ]}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handlePurchaseSubmit}
              >
                <Text style={styles.modalButtonTextPrimary}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 8,
  },
  seeMoreButton: {
    padding: 16,
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyState: {
    padding: 48,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalButtonTextPrimary: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
