// Helper para extrair mensagem de erro da API
export function getErrorMessage(error: any): string {
  if (!error.response?.data?.message) {
    return "Ocorreu um erro inesperado";
  }

  const message = error.response.data.message;

  // Se for array (erros de validação do NestJS)
  if (Array.isArray(message)) {
    return message.join("\n");
  }

  // Se for string
  return message;
}

