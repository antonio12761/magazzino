"use client";

import FormHeader from "@/components/dashboard/sidebar/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { makePostRequest } from "@/lib/apiRequest";

// Tipi per i dati del form
type BrandFormInputs = {
  title: string;
  description: string;
};

export default function NewBrand() {
  const [loading, setLoading] = useState(false); // Stato di caricamento

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandFormInputs>();

  const onSubmit: SubmitHandler<BrandFormInputs> = async (data) => {
    const url = "api/brands";
    const resourceName = "Brand";

    try {
      await makePostRequest<BrandFormInputs>({
        setLoading,
        endpoint: url,
        data,
        resourceName,
        reset,
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      {/** Header */}
      <FormHeader title="New Brand" href="/dashboard/inventory" />
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
              <TextareaInput<BrandFormInputs>
                label="Brand Description"
                name="description"
                isRequired={false}
                register={register}
                errors={errors}
                className="col-span-2"
              />
            </div>
            {/** SubmitButton */}
            <div className="flex justify-center mt-4">
              <SubmitButton isLoading={loading} title="Create Brand" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
