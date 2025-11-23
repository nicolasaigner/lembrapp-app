import { colors } from "./colors";

export const darkTheme = {
  mode: "dark" as const,
  colors: colors.dark,
};

export type Theme = typeof darkTheme;
