"use client";

import FormHeader from "@/components/FormInputs/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";
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
};

export default function NewCategory() {
  const [loading, setLoading] = useState(false); // Stato di caricamento del form
  const [isLoading, setIsLoading] = useState(true); // Stato di caricamento per i dati della tabella
  const [lastCategory, setLastCategory] = useState<Category | null>(null); // Stato per l'ultima categoria inserita
  const [categories, setCategories] = useState<Category[]>([]); // **Stato per le categorie**

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
      setLastCategory(data); // Aggiorna lo stato con l'ultima categoria
    } catch (error) {
      console.error("Errore nel caricamento dell'ultima categoria:", error);
    } finally {
      setIsLoading(false); // Il caricamento è terminato
    }
  };

  // Esegui la funzione per caricare l'ultima categoria al caricamento della pagina
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");

        // Verifica che la risposta sia OK (status 200)
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        // Specifica il tipo per `data`
        const data: Category[] = await response.json();

        // Controlla se la risposta contiene un array
        if (Array.isArray(data)) {
          setCategories(data); // Usa setCategories per aggiornare lo stato delle categorie
        } else {
          throw new Error("Invalid data format");
        }

        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error loading categories: ${errorMessage}`,
        });

        console.error("Error loading categories:", errorMessage);
        setLoading(false); // Assicurati che il caricamento termini anche in caso di errore
      }
    };

    fetchCategories();
  }, []);

  // Invia i dati del form al server
  const onSubmit: SubmitHandler<CategoryFormInputs> = async (data) => {
    const url = "/api/categories";
    const resourceName = "Category";

    try {
      await makePostRequest<CategoryFormInputs>({
        setLoading,
        endpoint: url,
        data,
        resourceName,
        reset,
      });

      // Aggiorna l'ultima categoria inserita dopo l'invio del form
      await fetchLastCategory(); // Chiamata per aggiornare la tabella
    } catch (error) {
      setLoading(false);
      console.error(error);
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
        {isLoading ? (
          <p className="mt-8">Loading...</p> // Mostra il caricamento
        ) : lastCategory ? (
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-4">
              Last Category Inserted
            </h3>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border text-xs">Title</th>
                  <th className="px-4 py-2 border text-xs">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">{lastCategory?.title}</td>
                  <td className="px-4 py-2 border">
                    {lastCategory?.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-8">No category inserted yet.</p> // Mostra il messaggio se non ci sono categorie
        )}
      </div>
    </>
  );
}
