"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js setup con DataLabels per sovrapporre i valori
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Schema di validazione Zod con validazione tra `incasso` e `contanti`
const incassoSchema = z
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
  })
  .refine((data) => data.contanti >= data.incasso, {
    path: ["contanti"],
    message: "Contanti non può essere inferiore a Incasso",
  });

// Definiamo il tipo delle props per il componente
interface NewIncassoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewIncasso({ isOpen, onClose }: NewIncassoProps) {
  // Inizializzazione di react-hook-form con zod
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(incassoSchema),
    mode: "onChange", // Validazione in tempo reale
    defaultValues: {
      date: new Date(),
      incasso: 0,
      elettronico: 0,
      contanti: 0,
    },
  });

  // Guarda i valori del form in tempo reale per aggiornare i grafici
  const formValues = watch();

  const onSubmit = (values: any) => {
    console.log("Form values:", values);
    onClose(); // Chiudi il modale dopo il submit
  };

  // Totale per il calcolo delle percentuali
  const totaleIncassoElettronico = formValues.incasso + formValues.elettronico;
  const parteEccedente = Math.max(formValues.contanti - formValues.incasso, 0);
  const totaleContantiIncasso = formValues.incasso + parteEccedente;

  // Calcola la percentuale per ogni parte
  const getPercentuale = (valore: number, totale: number) => {
    return totale > 0 ? ((valore / totale) * 100).toFixed(2) : "0";
  };

  // Dati per i grafici a torta con percentuali sovrapposte
  const pieChartDataIncassoElettronico = {
    labels: [
      `Incasso (${getPercentuale(
        formValues.incasso,
        totaleIncassoElettronico
      )}%)`,
      `Elettronico (${getPercentuale(
        formValues.elettronico,
        totaleIncassoElettronico
      )}%)`,
    ],
    datasets: [
      {
        data: [formValues.incasso, formValues.elettronico],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const pieChartDataContantiIncasso = {
    labels: [
      `Incasso (${getPercentuale(formValues.incasso, totaleContantiIncasso)}%)`,
      `Parte Eccedente (${getPercentuale(
        parteEccedente,
        totaleContantiIncasso
      )}%)`,
    ],
    datasets: [
      {
        data: [formValues.incasso, parteEccedente],
        backgroundColor: ["#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Opzioni per sovrapporre i valori percentuali sulle pie chart
  const pieOptions = {
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return percentage;
        },
      },
    },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl mb-4 font-bold text-center">Incasso</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* DatePicker per la selezione della data */}
          <div className="mb-4">
            <label className="block mb-2">Inserisci la data</label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              )}
            />
            {errors.date && (
              <div className="text-red-500 text-sm">{errors.date.message}</div>
            )}
          </div>

          {/* Input per Incasso, Elettronico, Contanti */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-2">Incasso</label>
              <input
                type="number"
                min="0" // Limita l'input a valori non negativi
                {...register("incasso", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.incasso && (
                <div className="text-red-500 text-sm">
                  {errors.incasso.message}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2">Elettronico</label>
              <input
                type="number"
                min="0" // Limita l'input a valori non negativi
                {...register("elettronico", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.elettronico && (
                <div className="text-red-500 text-sm">
                  {errors.elettronico.message}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2">Contanti</label>
              <input
                type="number"
                min="0" // Limita l'input a valori non negativi
                {...register("contanti", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.contanti && (
                <div className="text-red-500 text-sm">
                  {errors.contanti.message}
                </div>
              )}
            </div>
          </div>

          {/* Grafici a torta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-center mb-2">Incasso vs Elettronico</h3>
              <Pie data={pieChartDataIncassoElettronico} options={pieOptions} />
            </div>
            <div>
              <h3 className="text-center mb-2">Contanti vs Incasso</h3>
              <Pie data={pieChartDataContantiIncasso} options={pieOptions} />
            </div>
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
