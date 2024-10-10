import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { incassoSchema } from "./utils"; // importiamo lo schema di validazione

interface FormIncassoProps {
  onClose: () => void;
}

export default function FormIncasso({ onClose }: FormIncassoProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(incassoSchema),
    mode: "onChange",
    defaultValues: {
      giorno: new Date(),
      incasso: 0,
      elettronico: 0,
      contanti: 0,
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/incasso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Errore durante il salvataggio dei dati."
        );
      }

      onClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Errore",
        text: error.message || "Errore durante il salvataggio dei dati.",
        confirmButtonText: "Chiudi",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 mb-4">
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 text-xs">Inserisci la data</label>
          <Controller
            control={control}
            name="giorno"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            )}
          />
          {errors.giorno && (
            <div className="text-red-500 text-sm">{errors.giorno.message}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 text-xs">Incasso</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("incasso", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          {errors.incasso && (
            <div className="text-red-500 text-sm">{errors.incasso.message}</div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-xs">Elettronico</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("elettronico", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          {errors.elettronico && (
            <div className="text-red-500 text-sm">
              {errors.elettronico.message}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-xs">Contanti</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("contanti", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          {errors.contanti && (
            <div className="text-red-500 text-sm">
              {errors.contanti.message}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
