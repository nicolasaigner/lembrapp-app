import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

// Root Stack
export type RootStackParamList = {
  UserRegister: undefined;
  MainDrawer: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

// Drawer
export type DrawerParamList = {
  Dashboard: undefined;
  Items: undefined;
  NewItem: undefined;
  Settings: undefined;
};

export type DrawerNavigationProps = DrawerNavigationProp<DrawerParamList>;

// Item Detail
export type ItemDetailParams = {
  itemId?: string;
};
