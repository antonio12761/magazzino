"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormHeader from "../../../../../../../components/FormInputs/FormHeader";
import SubmitButton from "../../../../../../../components/FormInputs/SubmitButton";
import TextInput from "../../../../../../../components/FormInputs/TextInput";

// Tipi per i dati del form
type BrandFormInputs = {
  title: string;
};

export default function EditBrand() {
  const router = useRouter();
  const { id } = useParams(); // Ottiene l'ID dalla rotta

  const [loading, setLoading] = useState(true); // Stato di caricamento
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BrandFormInputs>();

  // Carica i dati del brand dal server
  useEffect(() => {
    if (id) {
      const fetchBrand = async () => {
        try {
          const response = await fetch(`/api/brands/${id}`);
          if (!response.ok) {
            throw new Error("Failed to load brand data");
          }
          const data = await response.json();

          setValue("title", data.title);
          setValue("description", data.description || "");
          setValue("website", data.website || "");
          setValue("logoUrl", data.logoUrl || "");
          setLoading(false);
        } catch (error) {
          console.error("Error loading brand:", error);
          setLoading(false);
        }
      };

      fetchBrand();
    }
  }, [id, setValue]);

  // Gestione dell'invio del form
  const onSubmit: SubmitHandler<BrandFormInputs> = async (data) => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/dashboard/inventory/brands"); // Torna alla lista dei brand
      } else {
        const errorData = await response.json();
        console.error("Failed to update brand:", errorData.message);
      }
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <FormHeader title="Edit Brand" href="/dashboard/inventory/brands" />
      <div className="p-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={false} title="Update Brand" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
