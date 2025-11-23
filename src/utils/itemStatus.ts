import { ItemStatus } from "../types";
import { Theme } from "../theme";

export function getStatusLabel(status: ItemStatus): string {
  switch (status) {
    case "EM_DIA":
      return "Em dia";
    case "ACABANDO":
      return "Acabando";
    case "EM_FALTA":
      return "Em falta";
    default:
      return status;
  }
}

export function getStatusColor(status: ItemStatus, theme: Theme): string {
  switch (status) {
    case "EM_DIA":
      return theme.colors.success;
    case "ACABANDO":
      return theme.colors.warning;
    case "EM_FALTA":
      return theme.colors.error;
    default:
      return theme.colors.textSecondary;
  }
}

export function getCategoryLabel(
  category: "PET" | "MEDICAMENTO_CONTROLADO" | "MEDICAMENTO" | "CASA",
): string {
  switch (category) {
    case "PET":
      return "Pet";
    case "MEDICAMENTO_CONTROLADO":
      return "Medicamento Controlado";
    case "MEDICAMENTO":
      return "Medicamento";
    case "CASA":
      return "Casa";
    default:
      return category;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR");
}
