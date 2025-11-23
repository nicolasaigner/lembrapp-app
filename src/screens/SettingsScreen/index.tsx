import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useApp, useTheme } from "../../contexts";
import { FormInput } from "../../components";
import { updateUser, deleteAccount } from "../../services/api";
import { ThemeMode } from "../../types";
import { getErrorMessage } from "../../utils/errorHandler";

export default function SettingsScreen() {
  const { user, setUser, logout } = useApp();
  const { theme, mode, setMode } = useTheme();

  const [phone, setPhone] = useState(user?.phone || "");
  const [notificationTime, setNotificationTime] = useState(
    user?.notificationTime || "09:00",
  );
  const [themePreference, setThemePreference] = useState<ThemeMode>(mode);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setPhone(user.phone || "");
      setNotificationTime(user.notificationTime);
      setThemePreference(user.themePreference);
    }
  }, [user]);

  const validateNotificationTime = (time: string): boolean => {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const handleSave = async () => {
    if (!user) return;

    const newErrors: Record<string, string> = {};

    if (!notificationTime.trim()) {
      newErrors.notificationTime = "Horário é obrigatório";
    } else if (!validateNotificationTime(notificationTime)) {
      newErrors.notificationTime = "Formato inválido (HH:mm)";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const updatedUser = await updateUser(user.id, {
        phone: phone.trim() || undefined,
        notificationTime,
        themePreference,
      });

      await setUser(updatedUser);
      await setMode(themePreference);

      Alert.alert("Sucesso", "Configurações atualizadas com sucesso!");
    } catch (error: any) {
      console.error("Error updating user:", error);
      Alert.alert("Erro", getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeChange = async (newTheme: ThemeMode) => {
    setThemePreference(newTheme);
    // Apply theme immediately for better UX
    await setMode(newTheme);
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Deseja realmente sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "⚠️ Excluir Conta",
      "ATENÇÃO: Esta ação é irreversível!\n\nTodos os seus dados serão permanentemente excluídos:\n• Sua conta\n• Todos os seus itens\n• Todo o histórico de compras\n\nDeseja realmente continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir Tudo",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);
              await deleteAccount();
              await logout();
              Alert.alert(
                "Conta Excluída",
                "Sua conta e todos os dados foram excluídos com sucesso."
              );
            } catch (error: any) {
              console.error("Error deleting account:", error);
              Alert.alert("Erro", getErrorMessage(error));
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            Configurações
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            {user?.name}
          </Text>
          <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
            {user?.email}
          </Text>
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
          >
            Informações de Contato
          </Text>

          <FormInput
            label="Telefone (opcional)"
            value={phone}
            onChangeText={setPhone}
            placeholder="(11) 99999-9999"
            keyboardType="phone-pad"
          />

          <FormInput
            label="Horário de notificação *"
            value={notificationTime}
            onChangeText={setNotificationTime}
            placeholder="09:00"
            error={errors.notificationTime}
            maxLength={5}
          />
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}
          >
            Aparência
          </Text>

          <View style={styles.pickerContainer}>
            <Text
              style={[
                styles.pickerLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Tema do aplicativo
            </Text>
            <View
              style={[styles.picker, { backgroundColor: theme.colors.surface }]}
            >
              <Picker
                selectedValue={themePreference}
                onValueChange={handleThemeChange}
                style={{ color: theme.colors.textPrimary }}
                dropdownIconColor={theme.colors.textPrimary}
              >
                <Picker.Item label="🌙 Tema Escuro" value="dark" />
                <Picker.Item label="☀️ Tema Claro" value="light" />
              </Picker>
            </View>
            <Text
              style={[styles.pickerHelp, { color: theme.colors.textSecondary }]}
            >
              A mudança é aplicada imediatamente
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.colors.primary },
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </TouchableOpacity>

        <View style={styles.dangerZone}>
          <Text
            style={[styles.dangerZoneTitle, { color: theme.colors.textPrimary }]}
          >
            Zona de Perigo
          </Text>

          <TouchableOpacity
            style={[
              styles.logoutButton,
              { borderColor: theme.colors.textSecondary },
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleLogout}
            disabled={isLoading}
          >
            <Text style={[styles.logoutButtonText, { color: theme.colors.textSecondary }]}>
              Sair da Conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.deleteButton,
              { backgroundColor: theme.colors.error },
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleDeleteAccount}
            disabled={isLoading}
          >
            <Text style={styles.deleteButtonText}>
              🗑️ Excluir Minha Conta (LGPD)
            </Text>
          </TouchableOpacity>

          <Text
            style={[styles.dangerWarning, { color: theme.colors.textSecondary }]}
          >
            ⚠️ A exclusão de conta é irreversível e apaga todos os seus dados permanentemente, conforme a LGPD.
          </Text>
        </View>

        <View style={styles.info}>
          <Text
            style={[styles.infoText, { color: theme.colors.textSecondary }]}
          >
            Lembrapp v1.0.0
          </Text>
          <Text
            style={[styles.infoText, { color: theme.colors.textSecondary }]}
          >
            Desenvolvido para AOP2 - Desenvolvimento Mobile
          </Text>
        </View>
      </ScrollView>
    </View>
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
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
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
    marginBottom: 4,
  },
  pickerHelp: {
    fontSize: 12,
    fontStyle: "italic",
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
  dangerZone: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  dangerZoneTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  logoutButton: {
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dangerWarning: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
  info: {
    marginTop: 40,
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },
});
