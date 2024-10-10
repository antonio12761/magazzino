"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema di validazione Zod per Ordine
const ordineSchema = z.object({
  fornitore: z.string().min(1, "Fornitore obbligatorio"),
  prodotto: z.string().min(1, "Prodotto obbligatorio"),
  quantita: z
    .number({ invalid_type_error: "Deve essere un numero" })
    .min(1, "La quantità deve essere almeno 1"),
});

interface NewOrdineProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewOrdine({ isOpen, onClose }: NewOrdineProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ordineSchema),
    defaultValues: {
      fornitore: "",
      prodotto: "",
      quantita: 1,
    },
  });

  const onSubmit = (values: any) => {
    console.log("Form values:", values);
    onClose(); // Chiudi il modale dopo il submit
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Nuovo Ordine</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input per Fornitore, Prodotto, Quantità */}
          <div className="mb-4">
            <label className="block mb-2">Fornitore</label>
            <input
              {...register("fornitore")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.fornitore && (
              <p className="text-red-500">{errors.fornitore.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Prodotto</label>
            <input
              {...register("prodotto")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.prodotto && (
              <p className="text-red-500">{errors.prodotto.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Quantità</label>
            <input
              type="number"
              {...register("quantita", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.quantita && (
              <p className="text-red-500">{errors.quantita.message}</p>
            )}
          </div>

          {/* Pulsanti */}
          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Salva
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Chiudi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
