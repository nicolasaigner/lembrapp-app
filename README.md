# 📱 Lembrapp - Frontend Mobile

Aplicativo React Native/Expo para gerenciamento inteligente de estoque doméstico.

## 🎯 Sobre o Projeto

O Lembrapp é um aplicativo mobile desenvolvido para a disciplina AOP2 - Desenvolvimento Mobile que permite gerenciar itens de uso doméstico, pets, medicamentos e itens controlados, com alertas inteligentes de recompra.

## ✨ Funcionalidades

### Requisitos Obrigatórios AOP2
- ✅ **Tela de Cadastro de Usuário** - Registro completo com validações
- ✅ **Múltiplas Telas** - Dashboard, Lista de Itens, Detalhes, Configurações
- ✅ **Drawer Navigator** - Navegação lateral com todas as seções
- ✅ **Context API** - Gerenciamento de estado global (AppContext e ThemeContext)
- ✅ **FlatList** - Lista otimizada de itens com performance
- ✅ **RNPicker** - Filtros de categoria e status

### Funcionalidades Principais
- 📊 **Dashboard Inteligente** - Visão geral dos itens por status
- 📝 **Gestão de Itens** - CRUD completo de itens
- 🔍 **Filtros Avançados** - Por categoria, status e busca textual
- 🛒 **Registro de Compras** - Histórico de recompras
- 🔔 **Alertas Automáticos** - Notificações de itens acabando ou em falta
- 🌙 **Dark Mode Padrão** - Com opção de tema claro
- 💾 **Persistência Local** - AsyncStorage para dados offline

## 🛠️ Stack Tecnológica

- **Framework**: React Native
- **Build Tool**: Expo SDK 54
- **Linguagem**: TypeScript
- **Navegação**: React Navigation (Stack + Drawer)
- **Estado Global**: Context API
- **Requisições HTTP**: Axios
- **Persistência**: AsyncStorage
- **UI Components**: React Native Paper, Picker
- **Ícones**: Expo Vector Icons

## 📁 Estrutura do Projeto

```
apps/app/
├── App.tsx                    # Entry point
├── app.json                   # Configurações do Expo
├── package.json
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ItemCard/        # Card de item com status
│   │   ├── FilterBar/       # Barra de filtros com RNPicker
│   │   └── FormInput/       # Input estilizado com tema
│   ├── contexts/            # Context API
│   │   ├── AppContext.tsx   # Estado global (user, items)
│   │   └── ThemeContext.tsx # Gerenciamento de tema
│   ├── navigation/          # Navegação
│   │   ├── RootStackNavigator.tsx
│   │   ├── DrawerNavigator.tsx
│   │   └── types.ts
│   ├── screens/             # Telas do app
│   │   ├── UserRegisterScreen/
│   │   ├── DashboardScreen/
│   │   ├── ItemsListScreen/
│   │   ├── ItemDetailScreen/
│   │   └── SettingsScreen/
│   ├── services/            # API
│   │   └── api.ts
│   ├── theme/               # Tema dark/light
│   │   ├── colors.ts
│   │   ├── darkTheme.ts
│   │   └── lightTheme.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── utils/               # Utilitários
│       └── itemStatus.ts
└── assets/                  # Imagens e ícones
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (iOS/Android) ou emulador

### Instalação

```bash
# Navegar para a pasta do app
cd apps/app

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

### Executar em Dispositivo

**Opção 1: Expo Go (mais fácil)**
```bash
npm start
# Escanear QR code com Expo Go app
```

**Opção 2: Emulador Android**
```bash
npm run android
```

**Opção 3: Simulador iOS (macOS)**
```bash
npm run ios
```

## 🎨 Temas

### Dark Theme (Padrão)
- Background: `#121212`
- Surface: `#1E1E1E`
- Primary: `#BB86FC`
- Secondary: `#03DAC6`

### Light Theme
- Background: `#FFFFFF`
- Surface: `#F5F5F5`
- Primary: `#6200EE`
- Secondary: `#03DAC6`

## 📱 Telas

### 1. UserRegisterScreen
Primeira tela obrigatória para novos usuários.

**Campos:**
- Nome completo (obrigatório)
- E-mail (obrigatório, validado)
- Telefone (opcional)
- Horário de notificação (obrigatório)
- Preferência de tema (dark/light)

### 2. DashboardScreen
Visão geral dos itens por status.

**Seções:**
- ⚠️ Em Falta - Itens que acabaram
- ⏰ Acabando - Itens próximos do fim
- ✅ Em Dia - Itens com estoque adequado

**Ações rápidas:**
- Registrar compra diretamente
- Ver detalhes do item

### 3. ItemsListScreen
Lista completa com filtros avançados.

**Recursos:**
- FlatList otimizada
- RNPicker para categoria
- RNPicker para status
- Busca textual por nome
- Pull-to-refresh

### 4. ItemDetailScreen
Criação e edição de itens.

**Campos:**
- Nome
- Categoria (Pet, Medicamento Controlado, Medicamento, Casa)
- Unidade (sachê, comprimido, kg, ml, etc)
- Quantidade total do lote
- Consumo diário
- Data de início
- Lead time (dias para recompra)
- Requer receita controlada (checkbox)
- Dias de antecedência da receita (se controlado)

### 5. SettingsScreen
Configurações do usuário.

**Opções:**
- Telefone
- Horário de notificação
- Tema (dark/light com aplicação imediata)

## 🔌 Integração com Backend

O app consome a API REST do backend Lembrapp.

**Configuração:**
Edite `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://SEU_IP:3000';
```

**Nota**: Para testar em dispositivo físico, use o IP da sua máquina, não `localhost`.

### Endpoints Utilizados

**Users:**
- `POST /users` - Criar usuário
- `GET /users/:id` - Buscar usuário
- `PATCH /users/:id` - Atualizar usuário

**Items:**
- `GET /items` - Listar itens (com filtros)
- `GET /items/:id` - Buscar item
- `POST /items` - Criar item
- `PATCH /items/:id` - Atualizar item
- `DELETE /items/:id` - Deletar item

**Purchases:**
- `POST /items/:itemId/purchases` - Registrar compra
- `GET /items/:itemId/purchases` - Listar compras

## 📊 Context API

### AppContext
Gerencia estado global da aplicação.

**Estado:**
- `user: User | null` - Usuário logado
- `items: Item[]` - Lista de itens
- `isLoading: boolean` - Estado de carregamento

**Funções:**
- `setUser(user)` - Atualizar usuário
- `setItems(items)` - Atualizar lista de itens
- `reloadItems()` - Recarregar itens do backend

### ThemeContext
Gerencia tema dark/light.

**Estado:**
- `mode: 'dark' | 'light'` - Modo atual
- `theme: Theme` - Objeto de tema com cores

**Funções:**
- `setMode(mode)` - Alterar tema (persiste em AsyncStorage)

## 🧪 Testando o App

### Fluxo de Teste Completo

1. **Cadastro de Usuário**
   - Preencher formulário
   - Escolher tema
   - Validar campos obrigatórios

2. **Dashboard**
   - Ver itens separados por status
   - Testar pull-to-refresh
   - Registrar compra rápida

3. **Lista de Itens**
   - Filtrar por categoria
   - Filtrar por status
   - Buscar por nome
   - Combinar filtros

4. **Criar Novo Item**
   - Navegar via Drawer "Novo Item"
   - Preencher todos os campos
   - Testar validações
   - Marcar "Requer receita" e ver campo adicional

5. **Configurações**
   - Alterar tema (ver mudança imediata)
   - Atualizar horário de notificação
   - Salvar alterações

## 🐛 Troubleshooting

### Erro: "Network request failed"
- Verifique se o backend está rodando
- Use o IP correto (não `localhost` em dispositivo físico)
- Exemplo: `http://192.168.1.100:3000`

### Erro: "Cannot find module"
```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm install
npm start --clear
```

### Tema não muda
- Verifique AsyncStorage
- Limpar dados do app
- Recarregar app

### Drawer não abre
- Verificar react-native-gesture-handler
- Importar no topo do App.tsx: `import 'react-native-gesture-handler'`

## 📝 Requisitos da AOP2 Atendidos

| Requisito | Status | Implementação |
|-----------|--------|---------------|
| Tela de Cadastro | ✅ | UserRegisterScreen com validações |
| Múltiplas Telas | ✅ | 5 telas principais |
| Drawer Navigator | ✅ | DrawerNavigator com 4 rotas |
| Context API | ✅ | AppContext + ThemeContext |
| FlatList | ✅ | ItemsListScreen |
| RNPicker | ✅ | FilterBar (categoria + status) |

## 🔮 Melhorias Futuras

- [ ] Notificações push reais
- [ ] Modo offline completo
- [ ] Gráficos de consumo
- [ ] Compartilhamento de listas
- [ ] Scanner de código de barras
- [ ] Exportar relatórios
- [ ] Integração com assistentes de voz

## 👥 Autor

Desenvolvido para AOP2 - Desenvolvimento Mobile

## 📄 Licença

Este projeto é acadêmico e destinado apenas para fins educacionais.

---

**Lembrapp** - Nunca mais esqueça de comprar algo importante! 🎯

