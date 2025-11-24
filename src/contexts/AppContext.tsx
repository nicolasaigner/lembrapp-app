import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Item } from "../types";
import { getItems, setAuthToken } from "../services/api";

interface AppContextValue {
  user: User | null;
  token: string | null;
  items: Item[];
  setUser: (user: User | null) => Promise<void>;
  setToken: (token: string | null) => Promise<void>;
  setItems: (items: Item[]) => void;
  reloadItems: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const USER_STORAGE_KEY = "@lembrapp:user";
const TOKEN_STORAGE_KEY = "@lembrapp:token";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserAndToken();
  }, []);

  // @ts-ignore
    useEffect(() => {
    if (user && token) {
      reloadItems();
    }
  }, [user, token, reloadItems]);

  const loadUserAndToken = async () => {
    try {
      const [savedUser, savedToken] = await Promise.all([
        AsyncStorage.getItem(USER_STORAGE_KEY),
        AsyncStorage.getItem(TOKEN_STORAGE_KEY),
      ]);

      if (savedUser && savedToken) {
        setUserState(JSON.parse(savedUser));
        setTokenState(savedToken);
        setAuthToken(savedToken); // Configurar token no axios
      }
    } catch (error) {
      console.error("Error loading user and token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUser = async (newUser: User | null) => {
    try {
      setUserState(newUser);
      if (newUser) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      } else {
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const setToken = async (newToken: string | null) => {
    try {
      setTokenState(newToken);
      setAuthToken(newToken); // Configurar token no axios
      if (newToken) {
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      } else {
        await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(USER_STORAGE_KEY),
        AsyncStorage.removeItem(TOKEN_STORAGE_KEY),
      ]);
      setUserState(null);
      setTokenState(null);
      setItems([]);
      setAuthToken(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const reloadItems = useCallback(async () => {
    if (!user) return;

    try {
      const fetchedItems = await getItems({ userId: user.id });
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        items,
        setUser,
        setToken,
        setItems,
        reloadItems,
        logout,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
