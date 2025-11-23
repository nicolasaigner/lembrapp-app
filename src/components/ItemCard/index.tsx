import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts";
import { Item } from "../../types";
import {
  getStatusLabel,
  getStatusColor,
  getCategoryLabel,
} from "../../utils/itemStatus";

interface ItemCardProps {
  item: Item;
  onPress?: () => void;
  onQuickPurchasePress?: () => void;
}

export default function ItemCard({
  item,
  onPress,
  onQuickPurchasePress,
}: ItemCardProps) {
  const { theme } = useTheme();

  const statusColor = item.status
    ? getStatusColor(item.status, theme)
    : theme.colors.textSecondary;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            {item.name}
          </Text>
          <Text
            style={[styles.category, { color: theme.colors.textSecondary }]}
          >
            {getCategoryLabel(item.category)}
          </Text>
        </View>
        {item.status && (
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
          </View>
        )}
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons
            name="cube-outline"
            size={16}
            color={theme.colors.textSecondary}
          />
          <Text
            style={[styles.infoText, { color: theme.colors.textSecondary }]}
          >
            {item.remainingQuantity?.toFixed(2) ?? 0} {item.unit}
          </Text>
        </View>

        {item.daysRemaining !== undefined && (
          <View style={styles.infoItem}>
            <Ionicons
              name="time-outline"
              size={16}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              {item.daysRemaining > 0
                ? `${Math.ceil(item.daysRemaining)} dias`
                : "Em falta"}
            </Text>
          </View>
        )}

        {item.needsPrescription && (
          <View style={styles.infoItem}>
            <Ionicons
              name="document-text-outline"
              size={16}
              color={theme.colors.warning}
            />
          </View>
        )}
      </View>

      {onQuickPurchasePress && (
        <TouchableOpacity
          style={[
            styles.purchaseButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={onQuickPurchasePress}
        >
          <Ionicons name="cart" size={16} color="#FFFFFF" />
          <Text style={styles.purchaseButtonText}>Registrar Compra</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 14,
  },
  purchaseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  purchaseButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
