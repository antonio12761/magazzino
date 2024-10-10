import { z } from "zod";

// Schema di validazione per il form di incasso
export const incassoSchema = z
  .object({
    incasso: z
      .number()
      .min(0, { message: "Incasso deve essere maggiore o uguale a 0" }),
    elettronico: z
      .number()
      .min(0, { message: "Elettronico deve essere maggiore o uguale a 0" }),
    contanti: z
      .number()
      .min(0, { message: "Contanti deve essere maggiore o uguale a 0" }),
    giorno: z.date().refine((value) => !isNaN(value.getTime()), {
      message: "La data non è valida.",
    }),
  })
  .refine((data) => data.contanti >= data.incasso + data.elettronico, {
    path: ["contanti"],
    message: "Contanti non può essere inferiore a Incasso più Elettronico",
  });

// Funzione per calcolare la percentuale
export const calculatePercentage = (value: number, total: number): string => {
  return total > 0 ? ((value / total) * 100).toFixed(2) + "%" : "0%";
};
