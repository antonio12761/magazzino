// categories/new
"use client";

import FormHeader from "@/components/FormInputs/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

// Tipi per i dati del form
type CategoryFormInputs = {
  title: string;
  description: string;
};

// Tipo per i dati della categoria
type Category = {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
};

export default function NewCategory() {
  const [loading, setLoading] = useState(false); // Stato di caricamento del form
  const [isLoading, setIsLoading] = useState(true); // Stato di caricamento per i dati della tabella
  const [lastCategory, setLastCategory] = useState<Category | null>(null); // Stato per l'ultima categoria inserita

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
        setLastCategory(data); // Aggiorna lo stato con l'ultima categoria
      } else {
        console.error(
          data.message || "Errore nel caricamento dell'ultima categoria"
        );
      }
    } catch (error) {
      console.error("Errore nel caricamento dell'ultima categoria:", error);
    } finally {
      setIsLoading(false); // Il caricamento è terminato
    }
  };

  // Esegui la funzione per caricare l'ultima categoria al caricamento della pagina
  useEffect(() => {
    fetchLastCategory();
  }, []);

  // Invia i dati del form al server
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
        Swal.fire("Success", "Category created successfully", "success");
        reset(); // Resetta il form
        await fetchLastCategory(); // Aggiorna l'ultima categoria inserita
      } else {
        const errorData = await response.json();
        Swal.fire(
          "Error",
          errorData.message || "Failed to create category",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Something went wrong, please try again later.",
        "error"
      );
      console.error("Error creating category:", error);
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
              <thead>
                <tr>
                  <th className="px-4 py-2 border text-xs">Title</th>
                  <th className="px-4 py-2 border text-xs">Description</th>
                  <th className="px-4 py-2 border text-xs">Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">{lastCategory.title}</td>
                  <td className="px-4 py-2 border">
                    {lastCategory.description}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(lastCategory.createdAt!).toLocaleString()}
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
