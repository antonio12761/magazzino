"use client";

import FormHeader from "@/components/dashboard/sidebar/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { makePostRequest } from "@/lib/apiRequest"; // Importa la funzione makePostRequest

type UnitFormInputs = {
  title: string;
  abbreviation: string;
};

export default function NewUnit() {
  const [loading, setLoading] = useState(false); // Stato di caricamento

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnitFormInputs>();

  const onSubmit: SubmitHandler<UnitFormInputs> = async (data) => {
    const url = "api/units";
    const resourceName = "Unit";

    try {
      await makePostRequest<UnitFormInputs>({
        setLoading,
        endpoint: url,
        data,
        resourceName,
        reset,
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <FormHeader title="New Unit" href="/dashboard/inventory" />
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
                label="Unit Abbreviation"
                name="abbreviation"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-1"
              />
            </div>
            <div className="flex justify-center ">
              <SubmitButton isLoading={loading} title="Create Unit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
