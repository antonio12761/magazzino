"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormHeader from "../../../../../../components/FormInputs/FormHeader";
import SubmitButton from "../../../../../../components/FormInputs/SubmitButton";
import TextInput from "../../../../../../components/FormInputs/TextInput";

// Tipi per i dati del form
type UnitFormInputs = {
  title: string;
  abbreviation: string;
};

// Tipo per l'ultima unità
type Unit = {
  id: string;
  title: string;
  abbreviation: string;
  createdAt: string;
  updatedAt: string;
};

export default function EditUnit() {
  const router = useRouter();
  const { id } = useParams(); // Ottiene l'ID dalla rotta

  const [loading, setLoading] = useState(true); // Stato di caricamento del form
  const [isLoading, setIsLoading] = useState(true); // Stato di caricamento per l'ultima unità
  const [lastUnit, setLastUnit] = useState<Unit | null>(null); // Ultima unità inserita

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UnitFormInputs>();

  // Carica i dati dell'unità dal server
  useEffect(() => {
    if (id) {
      const fetchUnit = async () => {
        try {
          const response = await fetch(`/api/units/${id}`);
          if (!response.ok) {
            throw new Error("Failed to load unit data");
          }
          const data = await response.json();

          // Imposta i valori del form con i dati caricati
          setValue("title", data.title);
          setValue("abbreviation", data.abbreviation);

          setLoading(false);
        } catch (error) {
          console.error("Error loading unit:", error);
          setLoading(false);
        }
      };

      fetchUnit();
    }
  }, [id, setValue]);

  // Funzione per ottenere l'ultima unità inserita
  const fetchLastUnit = async () => {
    try {
      const response = await fetch("/api/units/last");
      const data = await response.json();
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
    try {
      const response = await fetch(`/api/units/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/dashboard/inventory/units"); // Torna alla lista delle unità
      } else {
        const errorData = await response.json();
        console.error("Failed to update unit:", errorData.message);
      }
    } catch (error) {
      console.error("Error updating unit:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <FormHeader title="Edit Unit" href="/dashboard/inventory/units" />
      <div className="px-12">
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
                label="Abbreviation"
                name="abbreviation"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-1"
              />
            </div>
            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={false} title="Update Unit" />
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
    </>
  );
}
