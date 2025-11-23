import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  Alert,
} from "react-native";
import { useApp, useTheme } from "../../contexts";
import { FilterBar, ItemCard } from "../../components";
import { Item } from "../../types";

export default function ItemsListScreen() {
  const { items, reloadItems } = useApp();
  const { theme } = useTheme();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await reloadItems();
    setIsRefreshing(false);
  };

  const handleItemPress = (item: Item) => {
    // Navigate to item detail - to be implemented
    Alert.alert("Item", `Detalhes: ${item.name}`);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (categoryFilter && item.category !== categoryFilter) {
        return false;
      }

      // Status filter
      if (statusFilter && item.status !== statusFilter) {
        return false;
      }

      // Search text filter
      if (
        searchText &&
        !item.name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [items, categoryFilter, statusFilter, searchText]);

  const renderItem = ({ item }: { item: Item }) => (
    <ItemCard item={item} onPress={() => handleItemPress(item)} />
  );

  const renderListHeader = () => (
    <FilterBar
      category={categoryFilter}
      status={statusFilter}
      search={searchText}
      onCategoryChange={setCategoryFilter}
      onStatusChange={setStatusFilter}
      onSearchChange={setSearchText}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
        {items.length === 0
          ? "Nenhum item cadastrado ainda."
          : "Nenhum item encontrado com esses filtros."}
      </Text>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  emptyState: {
    padding: 48,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});
