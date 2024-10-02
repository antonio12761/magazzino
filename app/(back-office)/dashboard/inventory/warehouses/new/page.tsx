"use client";

import Link from "next/link";
import FormHeader from "@/components/FormInputs/FormHeader";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { makePostRequest } from "@/lib/apiRequest";

// Tipi per i dati del form
type WarehouseFormInputs = {
  title: string;
  description: string;
  location: string;
  type: string;
};

// Tipo per i dati del warehouse
type Warehouse = {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
};

// Valori hardcoded per il tipo di warehouse
const warehouseTypes = [
  { value: "casa-madre", label: "Casa Madre" },
  { value: "deposito", label: "Deposito" },
  { value: "filiale", label: "Filiale" },
];

export default function NewWarehouse() {
  const [loading, setLoading] = useState(false); // Stato di caricamento
  const [lastWarehouse, setLastWarehouse] = useState<Warehouse | null>(null); // Stato per l'ultimo warehouse inserito

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WarehouseFormInputs>();

  // Funzione per ottenere l'ultimo warehouse inserito
  const fetchLastWarehouse = async () => {
    try {
      const response = await fetch("/api/warehouses/last"); // Chiamata API per ottenere l'ultimo warehouse
      const data = await response.json();
      setLastWarehouse(data);
    } catch (error) {
      console.error("Errore nel caricamento dell'ultimo warehouse:", error);
    }
  };

  // Invia i dati del form al server
  const onSubmit: SubmitHandler<WarehouseFormInputs> = async (data) => {
    const url = "/api/warehouses"; // Assicurati che l'URL sia corretto
    const resourceName = "Warehouse";

    try {
      console.log("Dati inviati al server:", data); // Aggiungi un log per vedere i dati inviati
      await makePostRequest<WarehouseFormInputs>({
        setLoading,
        endpoint: url,
        data,
        resourceName,
        reset: () => reset(), // resetta i valori del form dopo l'invio
      });
      toast.success("Warehouse created successfully!");
      // Carica l'ultimo warehouse inserito dopo l'invio del form
      await fetchLastWarehouse();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Errore invio dati:", error); // Stampa l'errore nel frontend
    }
  };

  // Carica l'ultimo warehouse al montaggio del componente
  // Carica l'ultimo warehouse al montaggio del componente
  useEffect(() => {
    const fetchLastWarehouse = async () => {
      try {
        const response = await fetch("/api/warehouses/last");
        const data = await response.json();
        console.log("Dati caricati dall'API nel componente:", data); // Log per vedere i dati
        setLastWarehouse(data);
      } catch (error) {
        console.error("Errore nel caricamento dell'ultimo warehouse:", error);
      }
    };

    fetchLastWarehouse();
  }, []);

  return (
    <>
      <FormHeader
        title="New Warehouse"
        href="/dashboard/inventory/warehouses"
      />
      <div className="px-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <SelectInput<WarehouseFormInputs>
                label="Select the Warehouse Type"
                name="type"
                isRequired={true}
                register={register}
                options={warehouseTypes} // Valori hardcoded per il select
                className="col-span-2"
                errors={errors}
              />
              <TextInput<WarehouseFormInputs>
                label="Warehouse Title"
                name="title"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-2"
              />
              <TextInput<WarehouseFormInputs>
                label="Warehouse Location"
                name="location"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-2"
              />
              <TextareaInput<WarehouseFormInputs>
                label="Warehouse Description"
                name="description"
                isRequired={true}
                register={register}
                errors={errors}
                className="col-span-2"
              />
            </div>
            <div className="flex justify-center">
              <SubmitButton isLoading={loading} title="Create Warehouse" />
            </div>
          </form>
        </div>

        {/* Tabella con l'ultimo warehouse inserito */}
        {lastWarehouse ? (
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-4">
              Last Warehouse Inserted
            </h3>
            <table className="min-w-full bg-white border">
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">{lastWarehouse.title}</td>
                  <td className="px-4 py-2 border">{lastWarehouse.location}</td>
                  <td className="px-4 py-2 border">{lastWarehouse.type}</td>
                  <td className="px-4 py-2 border">
                    {lastWarehouse.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-8">No warehouse inserted yet.</p>
        )}
      </div>
    </>
  );
}
