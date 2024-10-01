"use client";

import FormHeader from "@/components/FormInputs/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Tipi per i dati del form
type BrandFormInputs = {
  title: string;
};

// Tipo per i dati del brand
type Brand = {
  id: string;
  title: string;
  createdAt?: string;
};

export default function NewBrand() {
  const [loading, setLoading] = useState(false); // Stato di caricamento del form
  const [isLoading, setIsLoading] = useState(true); // Stato di caricamento per i dati
  const [lastBrand, setLastBrand] = useState<Brand | null>(null); // Ultimo brand inserito

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandFormInputs>();

  // Funzione per ottenere l'ultimo brand inserito
  const fetchLastBrand = async () => {
    try {
      const response = await fetch("/api/brands/last");
      const data = await response.json();
      if (response.ok) {
        setLastBrand(data);
      } else {
        console.error(
          data.message || "Errore nel caricamento dell'ultimo brand"
        );
      }
    } catch (error) {
      console.error("Errore nel caricamento dell'ultimo brand:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carica l'ultimo brand al montaggio del componente
  useEffect(() => {
    fetchLastBrand();
  }, []);

  // Gestione dell'invio del form
  const onSubmit: SubmitHandler<BrandFormInputs> = async (data) => {
    const url = "/api/brands";
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
        await fetchLastBrand(); // Aggiorna l'ultimo brand inserito
      } else {
        const errorData = await response.json();
        console.error(
          errorData.message || "Failed to create brand"
        );
      }
    } catch (error) {
      console.error(
        "Something went wrong, please try again later.",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/** Header */}
      <FormHeader title="New Brand" href="/dashboard/inventory/brands" />

      {/** Form */}
      <div className="p-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {/** Text Input */}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <TextInput<BrandFormInputs>
                label="Brand Title"
                name="title"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-2"
              />
            </div>
            {/** SubmitButton */}
            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={loading} title="Create Brand" />
            </div>
          </form>
        </div>

        {/** Tabella con l'ultimo brand inserito */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-4">Last Brand Inserted</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : lastBrand ? (
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border text-xs">Title</th>
                  <th className="px-4 py-2 border text-xs">Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">{lastBrand.title}</td>
                  <td className="px-4 py-2 border">
                    {new Date(lastBrand.createdAt!).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No brand inserted yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
