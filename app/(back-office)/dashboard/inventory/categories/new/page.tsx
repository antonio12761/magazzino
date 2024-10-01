"use client";

import FormHeader from "@/components/FormInputs/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Tipi per i dati del form
type CategoryFormInputs = {
  title: string;
  description: string;
};

export default function NewCategory() {
  const [loading, setLoading] = useState(false); // Stato di caricamento del form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormInputs>();

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
      } else {
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormHeader title="New Category" href="/dashboard/inventory/categories" />
      <div className="p-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={loading} title="Create Category" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
