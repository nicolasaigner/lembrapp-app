# 📱 Lembrapp - Frontend Mobile

> Aplicativo React Native/Expo para gerenciamento inteligente de estoque doméstico

## 🎯 Sobre

App mobile desenvolvido com React Native/Expo para gerenciar itens consumíveis (ração pet, medicamentos, produtos de casa) com alertas inteligentes de recompra.

**Projeto AOP2 - CC5Ead Programação para Dispositivos Móveis**

---

## ✅ Requisitos AOP2 Implementados

| Requisito | Status | Implementação |
|-----------|--------|---------------|
| Tela de cadastro | ✅ | UserRegisterScreen com validações |
| Múltiplas telas (4+) | ✅ | 5 telas implementadas |
| Drawer Navigator | ✅ | Customizado com tema dark/light |
| Context API | ✅ | AppContext + ThemeContext |
| FlatList | ✅ | ItemsListScreen com pull-to-refresh |
| RNPicker | ✅ | FilterBar (2 pickers: categoria + status) |
| Comunicação direta | ✅ | Props entre componentes |
| Comunicação indireta | ✅ | Context + callbacks |
| Paleta de cores | ✅ | Dark mode (padrão) + Light mode |
| API RESTful | ✅ | GET/POST integrado com backend |

---

## 🛠️ Stack Tecnológica

- **Framework:** React Native / Expo SDK 54
- **Linguagem:** TypeScript
- **Navegação:** React Navigation (Stack + Drawer)
- **Estado:** Context API
- **HTTP:** Axios
- **Persistência:** AsyncStorage
- **UI:** React Native Paper, Picker

---

## 📱 Telas

1. **UserRegisterScreen** - Cadastro com validações
2. **DashboardScreen** - Visão geral por status
3. **ItemsListScreen** - Lista com FlatList + filtros RNPicker
4. **ItemDetailScreen** - CRUD de itens + histórico
5. **SettingsScreen** - Configurações e tema

---

## 🚀 Como Executar

### No Snack Expo
1. Acesse: https://snack.expo.dev/
2. Import: `https://github.com/nicolasaigner/lembrapp-app`
3. Escaneie QR Code com Expo Go

### Localmente
```bash
npm install
npm start
```

---

## 🎨 Tema

### Dark Mode (Padrão)
- Background: #121212
- Surface: #1E1E1E
- Primary: #BB86FC

### Light Mode
- Background: #FFFFFF
- Surface: #F5F5F5
- Primary: #6200EE

---

## 📦 Estrutura

```
src/
├── components/      # Componentes reutilizáveis
│   ├── ItemCard/   # Card de item
│   ├── FilterBar/  # Filtros RNPicker
│   └── FormInput/  # Input customizado
├── contexts/       # Context API
│   ├── AppContext.tsx
│   └── ThemeContext.tsx
├── navigation/     # Navegação
│   ├── DrawerNavigator.tsx
│   └── RootStackNavigator.tsx
├── screens/        # Telas
│   ├── UserRegisterScreen/
│   ├── DashboardScreen/
│   ├── ItemsListScreen/
│   ├── ItemDetailScreen/
│   └── SettingsScreen/
├── services/       # API integration
├── theme/          # Cores e temas
├── types/          # TypeScript types
└── utils/          # Helpers
```

---

## 🔗 Backend API

Integra com API NestJS:
- **Repositório:** https://github.com/nicolasaigner/lembrapp-api
- **URL padrão:** http://localhost:3000
- **Configurável em:** `src/services/api.ts`

---

## 🔗 Repositórios Relacionados

- **Backend API:** https://github.com/nicolasaigner/lembrapp-api
- **Repositório Principal:** https://github.com/nicolasaigner/aop2-desenvolvimento-mobile

---

## 📹 Demonstração

**Snack:** https://snack.expo.dev/@nicolasaigner/lembrapp

---

## 👤 Autor

**Nicolas Aigner**
- Curso: Ciência da Computação - CC3Ead
- Disciplina: CC5Ead - Programação para Dispositivos Móveis
- Professor: Saulo Pereira Ribeiro

---

## 📝 Licença

Projeto acadêmico - CC5Ead (2024)

