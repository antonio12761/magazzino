"use client"; // Aggiungi questa riga per assicurarti che il componente sia client-side

import FormHeader from "@/components/FormInputs/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Tipi per i dati del form
type CategoryFormInputs = {
  title: string;
  description: string;
};

// Tipo per la categoria
type Category = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export default function NewCategory() {
  const [loading, setLoading] = useState(false); // Stato di caricamento del form
  const [isLoading, setIsLoading] = useState(true); // Stato di caricamento per i dati
  const [lastCategory, setLastCategory] = useState<Category | null>(null); // Ultima categoria inserita

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormInputs>();

  // Funzione per ottenere l'ultima categoria inserita
  const fetchLastCategory = async () => {
    try {
      const response = await fetch("/api/categories/last");
      const data = await response.json();
      if (response.ok) {
        setLastCategory(data);
      } else {
        console.error(
          data.message || "Errore nel caricamento dell'ultima categoria"
        );
      }
    } catch (error) {
      console.error("Errore nel caricamento dell'ultima categoria:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carica l'ultima categoria al montaggio del componente
  useEffect(() => {
    fetchLastCategory();
  }, []);

  // Gestione dell'invio del form
  const onSubmit: SubmitHandler<CategoryFormInputs> = async (data) => {
    const url = "/api/categories";
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset(); // Resetta il form
        await fetchLastCategory(); // Aggiorna l'ultima categoria inserita
      } else {
        const errorData = await response.json();
        console.error(errorData.message || "Failed to create category");
      }
    } catch (error) {
      console.error("Something went wrong, please try again later.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/** Header */}
      <FormHeader title="New Category" href="/dashboard/inventory/categories" />

      {/** Form */}
      <div className="p-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {/** Text Input */}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <TextInput<CategoryFormInputs>
                label="Category Title"
                name="title"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-2"
              />
              <TextareaInput<CategoryFormInputs>
                label="Category Description"
                name="description"
                isRequired={true}
                register={register}
                errors={errors}
                className="col-span-2"
              />
            </div>
            {/** SubmitButton */}
            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={loading} title="Create Category" />
            </div>
          </form>
        </div>

        {/** Tabella con l'ultima categoria inserita */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-4">Last Category Inserted</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : lastCategory ? (
            <table className="min-w-full bg-white border">
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">{lastCategory.title}</td>
                  <td className="px-4 py-2 border truncate text-ellipsis whitespace-nowrap overflow-hidden max-w-none lg:max-w-[400px] md:max-w-[300px] sm:max-w-[150px]">
                    {lastCategory.description ? (
                      <span className="sm:hidden">
                        {lastCategory.description.slice(0, 20)}...
                      </span>
                    ) : (
                      <span className="sm:hidden">No description...</span>
                    )}
                    <span className="hidden sm:inline">
                      {lastCategory.description || "No description available"}
                    </span>{" "}
                    {/* Testo completo su schermi medi e grandi */}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No category inserted yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
