# 📱 Lembrapp - Gerenciador Inteligente de Estoque Doméstico

> Aplicativo React Native/Expo para gerenciamento de itens consumíveis (ração pet, medicamentos, produtos de casa) com alertas inteligentes de recompra.

## 🎯 Sobre o Projeto

Projeto desenvolvido para a disciplina **CC5Ead - Programação para Dispositivos Móveis** (AOP2).

**Aluno:** Nicolas Aigner  
**Matrícula:** 202415633  
**Curso:** Ciência da Computação - CC3Ead  
**Professor:** Saulo Pereira Ribeiro

---

## ✨ Funcionalidades

### ✅ Requisitos Obrigatórios AOP2
- ✅ **Tela de Cadastro de Usuário** - Registro completo com validações
- ✅ **Múltiplas Telas** - 5 telas implementadas (excede mínimo de 4)
- ✅ **Drawer Navigator** - Navegação lateral customizada
- ✅ **Context API** - Gerenciamento de estado global (AppContext e ThemeContext)
- ✅ **FlatList** - Lista otimizada de itens
- ✅ **RNPicker** - Filtros de categoria e status

### 📱 Telas do Aplicativo
1. **UserRegisterScreen** - Cadastro de usuário com validações
2. **DashboardScreen** - Visão geral dos itens por status
3. **ItemsListScreen** - Lista de itens com filtros avançados
4. **ItemDetailScreen** - Criar/editar itens e registrar compras
5. **SettingsScreen** - Configurações do usuário e tema

### 🎨 Recursos Extras
- 🌙 **Dark Mode** - Tema escuro padrão
- ☀️ **Light Mode** - Opção de tema claro
- 💾 **AsyncStorage** - Persistência de dados offline
- 🔔 **Alertas** - Notificações de itens acabando ou em falta
- 📊 **Cálculos Automáticos** - Estoque, dias restantes, status

---

## 🛠️ Stack Tecnológica

- **Framework:** React Native / Expo SDK 54
- **Linguagem:** TypeScript
- **Navegação:** React Navigation (Stack + Drawer)
- **Estado Global:** Context API
- **Requisições HTTP:** Axios
- **Persistência:** AsyncStorage
- **UI Components:** React Native Paper, Picker
- **Ícones:** Expo Vector Icons

---

## 🚀 Como Executar

### No Snack Expo (Online)
1. Acesse: [Link do Snack](https://snack.expo.dev/@seu-usuario/lembrapp)
2. Abra o app **Expo Go** no seu celular
3. Escaneie o QR Code
4. Pronto! O app está rodando

### Localmente

```bash
# Instalar dependências
npm install

# Iniciar o Expo
npm start
```

---

## 📚 Estrutura do Projeto

```
lembrapp-snack/
├── App.tsx                    # Entry point
├── app.json                   # Configurações do Expo
├── package.json
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ItemCard/        # Card de item com status
│   │   ├── FilterBar/       # Barra de filtros com RNPicker
│   │   └── FormInput/       # Input estilizado
│   ├── contexts/            # Context API
│   │   ├── AppContext.tsx   # Estado global (user, items)
│   │   └── ThemeContext.tsx # Tema dark/light
│   ├── navigation/          # Navegação
│   │   ├── RootStackNavigator.tsx
│   │   └── DrawerNavigator.tsx
│   ├── screens/             # Telas do app
│   │   ├── UserRegisterScreen/
│   │   ├── DashboardScreen/
│   │   ├── ItemsListScreen/
│   │   ├── ItemDetailScreen/
│   │   └── SettingsScreen/
│   ├── services/            # API
│   │   └── api.ts
│   ├── theme/               # Tema dark/light
│   ├── types/               # TypeScript types
│   └── utils/               # Utilitários
└── assets/                  # Imagens e ícones
```

---

## 🎨 Tema e Cores

### Dark Mode (Padrão)
- **Background:** #121212
- **Surface:** #1E1E1E
- **Primary:** #BB86FC
- **Text:** #FFFFFF

### Light Mode
- **Background:** #FFFFFF
- **Surface:** #F5F5F5
- **Primary:** #6200EE
- **Text:** #000000

---

## 📊 Integração com Backend

O app se conecta a uma API RESTful desenvolvida em NestJS:

- **Users:** Cadastro e atualização de usuários
- **Items:** CRUD completo de itens
- **Purchases:** Registro de compras e histórico

**API URL:** Configurável em `src/services/api.ts`

---

## ✅ Requisitos AOP2 Atendidos

| Requisito | Status | Implementação |
|-----------|--------|---------------|
| Tela de cadastro | ✅ | UserRegisterScreen com validações |
| Múltiplas telas (4+) | ✅ | 5 telas implementadas |
| Drawer Navigator | ✅ | Customizado com tema |
| Context API | ✅ | AppContext + ThemeContext |
| FlatList | ✅ | ItemsListScreen com pull-to-refresh |
| RNPicker | ✅ | FilterBar com 2 pickers |
| Comunicação direta | ✅ | Props entre componentes |
| Comunicação indireta | ✅ | Context + callbacks |
| Paleta de cores | ✅ | Dark/Light mode |
| API RESTful | ✅ | GET/POST para backend |
| Validações | ✅ | Formulários completos |

---

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos na disciplina CC5Ead - Programação para Dispositivos Móveis.

---

## 👤 Autor

**Nicolas Aigner**
- Matrícula: 202415633
- Curso: Ciência da Computação - CC3Ead
- Disciplina: CC5Ead - Programação para Dispositivos Móveis
- Professor: Saulo Pereira Ribeiro

---

**Data:** Novembro 2024

