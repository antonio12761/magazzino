"use client";

import FormHeader from "../../../../../../../components/FormInputs/FormHeader";
import SubmitButton from "../../../../../../../components/FormInputs/SubmitButton";
import TextInput from "../../../../../../../components/FormInputs/TextInput";
import TextareaInput from "../../../../../../../components/FormInputs/TextareaInput";
import SelectInput from "../../../../../../../components/FormInputs/SelectInput";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

// Tipi per i dati del form
type WarehouseFormInputs = {
  title: string;
  location: string;
  description: string;
  type: string;
};

// Valori hardcoded per il tipo di warehouse
const warehouseTypes = [
  { value: "casa-madre", label: "Casa Madre" },
  { value: "deposito", label: "Deposito" },
  { value: "filiale", label: "Filiale" },
];

export default function EditWarehouse() {
  const router = useRouter();
  const { id } = useParams(); // Ottieni l'ID dalla rotta

  const [loading, setLoading] = useState(true); // Stato di caricamento
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WarehouseFormInputs>();

  // Carica i dati del warehouse dal server
  useEffect(() => {
    if (id) {
      const fetchWarehouse = async () => {
        try {
          const response = await fetch(`/api/warehouses/${id}`);
          const data = await response.json();
          if (response.ok) {
            setValue("title", data.title);
            setValue("location", data.location);
            setValue("description", data.description);
            setValue("type", data.warehouseType); // Usare warehouseType come definito nel modello
            setLoading(false);
          } else {
            console.error("Warehouse not found");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error loading warehouse:", error);
          setLoading(false);
        }
      };

      fetchWarehouse();
    }
  }, [id, setValue]);

  // Gestione dell'invio del form
  const onSubmit: SubmitHandler<WarehouseFormInputs> = async (data) => {
    console.log("Dati inviati al server:", data); // Verifica i dati inviati al server
    console.log("ID del magazzino:", id); // Verifica l'ID del magazzino

    try {
      const response = await fetch(`/api/warehouses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Warehouse aggiornato con successo");
        router.push("/dashboard/inventory/warehouses");
      } else {
        const errorData = await response.json();
        console.error("Errore durante l'aggiornamento:", errorData); // Log per eventuali errori
      }
    } catch (error) {
      console.error("Errore durante la richiesta di aggiornamento:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <FormHeader
        title="Edit Warehouse"
        href="/dashboard/inventory/warehouses"
      />
      <div className="p-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
              <SelectInput<WarehouseFormInputs>
                label="Warehouse Type"
                name="type"
                isRequired={true}
                register={register}
                options={warehouseTypes} // Valori hardcoded per il tipo di warehouse
                className="col-span-2"
                errors={errors}
              />
            </div>
            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={false} title="Update Warehouse" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
