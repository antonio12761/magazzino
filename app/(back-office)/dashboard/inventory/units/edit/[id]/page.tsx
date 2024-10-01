"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormHeader from "../../../../../../../components/FormInputs/FormHeader";
import SubmitButton from "../../../../../../../components/FormInputs/SubmitButton";
import TextInput from "../../../../../../../components/FormInputs/TextInput";

// Tipi per i dati del form
type UnitFormInputs = {
  title: string;
  abbreviation: string;
};

export default function EditUnit() {
  const router = useRouter();
  const { id } = useParams(); // Ottiene l'ID dalla rotta

  const [loading, setLoading] = useState(true); // Stato di caricamento
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
      </div>
    </>
  );
}
