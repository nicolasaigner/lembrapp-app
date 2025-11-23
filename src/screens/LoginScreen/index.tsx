import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp, useTheme } from '../../contexts';
import { FormInput } from '../../components';
import { login } from '../../services/api';
import { getErrorMessage } from '../../utils/errorHandler';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUser, setToken } = useApp();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Validar
    if (!email.trim()) {
      setError('E-mail é obrigatório');
      return;
    }

    if (!validateEmail(email)) {
      setError('E-mail inválido');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await login(email.trim());

      // Salvar usuário e token
      await setToken(response.access_token);
      await setUser(response.user);

      console.log('✅ Login successful:', response.user);
    } catch (error: any) {
      console.error('❌ Login error:', error);

      if (error.response?.status === 401) {
        Alert.alert(
          'Erro',
          'E-mail não encontrado. Deseja criar uma conta?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Criar Conta',
              onPress: () => navigation.navigate('UserRegister' as never),
            },
          ]
        );
      } else {
        Alert.alert('Erro', getErrorMessage(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('UserRegister' as never);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            Bem-vindo ao Lembrapp
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Faça login para continuar
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            label="E-mail"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            placeholder="exemplo@email.com"
            error={error}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.colors.primary },
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
            <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>
              ou
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
          </View>

          <TouchableOpacity
            style={[
              styles.registerButton,
              { borderColor: theme.colors.primary },
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={[styles.registerButtonText, { color: theme.colors.primary }]}>
              Criar Nova Conta
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.footer, { color: theme.colors.textSecondary }]}>
          Login simplificado sem senha para facilitar os testes.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  registerButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 24,
  },
});

