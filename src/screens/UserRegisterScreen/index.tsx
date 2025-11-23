import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useApp, useTheme } from '../../contexts';
import { FormInput } from '../../components';
import { register } from '../../services/api';
import { ThemeMode } from '../../types';
import { getErrorMessage } from '../../utils/errorHandler';

export default function UserRegisterScreen() {
  const { setUser, setToken } = useApp();
  const { theme, setMode } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notificationTime, setNotificationTime] = useState("09:00");
  const [themePreference, setThemePreference] = useState<ThemeMode>("dark");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    notificationTime: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNotificationTime = (time: string): boolean => {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const handleSubmit = async () => {
    // Validate
    const newErrors = {
      name: "",
      email: "",
      notificationTime: "",
    };

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!notificationTime.trim()) {
      newErrors.notificationTime = "Horário é obrigatório";
    } else if (!validateNotificationTime(notificationTime)) {
      newErrors.notificationTime = "Formato inválido (HH:mm)";
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.notificationTime) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        notificationTime,
        themePreference,
      });

      // Salvar token e usuário
      await setToken(response.access_token);
      await setUser(response.user);
      await setMode(themePreference);
    } catch (error: any) {
      console.error("Error creating user:", error);
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
            Bem-vindo ao Lembrapp
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            Cadastre-se para começar a gerenciar seus itens
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            label="Nome completo *"
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            error={errors.name}
            autoCapitalize="words"
          />

          <FormInput
            label="E-mail *"
            value={email}
            onChangeText={setEmail}
            placeholder="exemplo@email.com"
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

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

          <View style={styles.pickerContainer}>
            <Text
              style={[styles.pickerLabel, { color: theme.colors.textPrimary }]}
            >
              Tema preferido
            </Text>
            <View
              style={[styles.picker, { backgroundColor: theme.colors.surface }]}
            >
              <Picker
                selectedValue={themePreference}
                onValueChange={(value) => setThemePreference(value)}
                style={{ color: theme.colors.textPrimary }}
                dropdownIconColor={theme.colors.textPrimary}
              >
                <Picker.Item label="Tema Escuro (padrão)" value="dark" />
                <Picker.Item label="Tema Claro" value="light" />
              </Picker>
            </View>
          </View>

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
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 32,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    marginBottom: 24,
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
