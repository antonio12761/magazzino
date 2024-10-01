"use client";

import FormHeader from "@/components/FormInputs/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

// Tipi per i dati del form
type CategoryFormInputs = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

export default function EditCategory() {
  const router = useRouter();
  const { id } = useParams(); // Ottieni l'ID dalla rotta

  const [loading, setLoading] = useState(true); // Stato di caricamento
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormInputs>();

  // Carica i dati della categoria dal server
  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await fetch(`/api/categories/${id}`);
          const data = await response.json();
          if (response.ok) {
            setValue("title", data.title);
            setValue("description", data.description);
            setLoading(false);
          } else {
            console.error("Category not found");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error loading category:", error);
          setLoading(false);
        }
      };

      fetchCategory();
    }
  }, [id, setValue]);

  // Gestione dell'invio del form
  const onSubmit: SubmitHandler<CategoryFormInputs> = async (data) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/dashboard/inventory/categories"); // Torna alla lista delle categorie
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <FormHeader
        title="Edit Category"
        href="/dashboard/inventory/categories"
      />
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
              <SubmitButton isLoading={false} title="Update Category" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
