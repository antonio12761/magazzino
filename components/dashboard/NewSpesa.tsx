"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema di validazione Zod per Spesa
const spesaSchema = z.object({
  descrizione: z.string().min(1, "Descrizione obbligatoria"),
  importo: z
    .number({ invalid_type_error: "Deve essere un numero" })
    .min(0, "L'importo deve essere maggiore o uguale a 0"),
});

interface NewSpesaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewSpesa({ isOpen, onClose }: NewSpesaProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(spesaSchema),
    defaultValues: {
      descrizione: "",
      importo: 0,
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
        <h2 className="text-2xl mb-4 font-bold text-center">Nuova Spesa</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input per Descrizione e Importo */}
          <div className="mb-4">
            <label className="block mb-2">Descrizione</label>
            <input
              {...register("descrizione")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.descrizione && (
              <p className="text-red-500">{errors.descrizione.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Importo</label>
            <input
              type="number"
              {...register("importo", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.importo && (
              <p className="text-red-500">{errors.importo.message}</p>
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
