"use client";

import FormHeader from "@/components/FormInputs/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { makePostRequest } from "@/lib/apiRequest"; // Importa la funzione makePostRequest

// Tipi per i dati del form
type UnitFormInputs = {
  title: string;
  abbreviation: string;
  createdAt: string;
  updatedAt: string;
};

// Tipo per i dati dell'ultima unità
type Unit = {
  id: string;
  title: string;
  abbreviation: string;
  createdAt: string;
  updatedAt: string;
};

export default function NewUnit() {
  const [loading, setLoading] = useState(false); // Stato di caricamento del form
  const [isLoading, setIsLoading] = useState(true); // Stato di caricamento per l'ultima unità
  const [lastUnit, setLastUnit] = useState<Unit | null>(null); // Ultima unità inserita

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnitFormInputs>();

  // Funzione per ottenere l'ultima unità inserita
  const fetchLastUnit = async () => {
    try {
      const response = await fetch("/api/units/last");
      const data = await response.json();
      console.log("Last Unit Data in React:", data); // Log per vedere i dati

      if (response.ok) {
        setLastUnit(data);
      } else {
        console.error(
          data.message || "Errore nel caricamento dell'ultima unità"
        );
      }
    } catch (error) {
      console.error("Errore nel caricamento dell'ultima unità:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carica l'ultima unità al montaggio del componente
  useEffect(() => {
    fetchLastUnit();
  }, []);

  // Gestione dell'invio del form
  const onSubmit: SubmitHandler<UnitFormInputs> = async (data) => {
    const url = "api/units";
    const resourceName = "Unit";

    try {
      await makePostRequest<UnitFormInputs>({
        setLoading,
        endpoint: url,
        data,
        resourceName,
        reset,
      });
      toast.success("Unit created successfully!");
      await fetchLastUnit(); // Aggiorna l'ultima unità inserita
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <FormHeader title="New Unit" href="/dashboard/inventory/units" />
      <div className="p-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <TextInput<UnitFormInputs>
                label="Unit Title"
                name="title"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-1"
              />
              <TextInput<UnitFormInputs>
                label="Unit Abbreviation"
                name="abbreviation"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-1"
              />
            </div>
            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={loading} title="Create Unit" />
            </div>
          </form>
        </div>

        {/** Tabella con l'ultima unità inserita */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-4">Last Unit Inserted</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : lastUnit ? (
            <table className="min-w-full bg-white border">
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">{lastUnit.title}</td>
                  <td className="px-4 py-2 border">{lastUnit.abbreviation}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No unit inserted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
