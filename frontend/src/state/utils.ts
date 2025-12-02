import { toaster } from "@/components/ui/toaster";
import { AxiosError } from "axios";

export const parseAxiosError = (
  err: unknown
): string | Record<string, string[]> | null => {
  if (err instanceof AxiosError) {
    const data = err.response?.data;

    if (!data) return err.message;
    if ("detail" in data) return data.detail;

    return data as Record<string, string[]>;
  }

  if (err instanceof Error) return err.message;

  return "Something went wrong. Please try again.";
};

export const notifyIfString = (
  message: string | Record<string, string[]> | null
) => {
  if (typeof message === "string" && message) {
    toaster.create({
      type: "error",
      title: "Error",
      description: message,
      closable: true,
    });
  }
};
