import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootDrawerParamList } from "../../types";
import { styles } from "./styles";
import { api } from "../../services/api";
import { useAppContext } from "../../contexts/AppContext";

type Props = NativeStackScreenProps<RootDrawerParamList, "RegisterUser">;

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterUserScreen: React.FC<Props> = () => {
  const { setCurrentUser, theme } = useAppContext();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Nome é obrigatório.";
    }

    if (!form.email.trim()) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (!form.password) {
      newErrors.password = "Senha é obrigatória.";
    } else if (form.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirme a senha.";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "As senhas não conferem.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const user = await api.createUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      setCurrentUser(user);

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível cadastrar o usuário.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: theme.text }]}>
        Cadastro de Usuário
      </Text>

      <Text style={[styles.label, { color: theme.textSecondary }]}>Nome *</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.border,
            backgroundColor: theme.card,
            color: theme.text,
          },
        ]}
        placeholder="Digite seu nome"
        placeholderTextColor={theme.textLight}
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      {errors.name && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {errors.name}
        </Text>
      )}

      <Text style={[styles.label, { color: theme.textSecondary }]}>
        E-mail *
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.border,
            backgroundColor: theme.card,
            color: theme.text,
          },
        ]}
        placeholder="exemplo@dominio.com"
        placeholderTextColor={theme.textLight}
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      {errors.email && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {errors.email}
        </Text>
      )}

      <Text style={[styles.label, { color: theme.textSecondary }]}>
        Senha *
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.border,
            backgroundColor: theme.card,
            color: theme.text,
          },
        ]}
        placeholder="******"
        placeholderTextColor={theme.textLight}
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      {errors.password && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {errors.password}
        </Text>
      )}

      <Text style={[styles.label, { color: theme.textSecondary }]}>
        Confirmar Senha *
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.border,
            backgroundColor: theme.card,
            color: theme.text,
          },
        ]}
        placeholder="******"
        placeholderTextColor={theme.textLight}
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />
      {errors.confirmPassword && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {errors.confirmPassword}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Salvando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.infoText, { color: theme.textLight }]}>
        Os campos marcados com * são obrigatórios. Os dados são enviados para a
        API NestJS (POST /users).
      </Text>
    </ScrollView>
  );
};

export default RegisterUserScreen;
