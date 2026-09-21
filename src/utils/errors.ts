import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    if (!error.response) {
      return "Cannot reach the server. Please try again.";
    }

    const message = error.response.data?.message;

    if (Array.isArray(message)) return message.join(", ");
    if (typeof message === "string") return message;
  }

  return "Something went wrong. Please try again.";
};
