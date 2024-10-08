"use client";

import { useRouter } from "next/navigation"; // Importa il router per il reindirizzamento
import FormHeader from "@/components/FormInputs/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

// Tipi per i dati del form
type SupplierFormInputs = {
  title: string;
  phone: string;
  email: string;
  address: string;
  contactPerson: string;
  supplierCode: string;
  paymentTerms: string;
  taxID: string;
  notes: string;
};

export default function NewSupplier() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Usa il router di Next.js per il reindirizzamento

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormInputs>();

  // Funzione che gestisce la sottomissione del modulo
  const onSubmit: SubmitHandler<SupplierFormInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Supplier created successfully!");
        reset(); // Resetta il form dopo la creazione
        router.push("/dashboard/inventory/suppliers"); // Reindirizza alla lista dei fornitori
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create supplier");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormHeader title="New Supplier" href="/dashboard/inventory/suppliers" />
      <div className="px-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TextInput<SupplierFormInputs>
                label="Supplier Name"
                name="title"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-2"
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Supplier Phone"
                name="phone"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Supplier Email"
                name="email"
                isRequired={true}
                register={register}
                type="email"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Supplier Address"
                name="address"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-2"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Contact Person"
                name="contactPerson"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Supplier Code"
                name="supplierCode"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Tax ID"
                name="taxID"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextareaInput<SupplierFormInputs>
                label="Payment Terms"
                name="paymentTerms"
                isRequired={true}
                register={register}
                className="col-span-2"
                errors={errors}
                disabled={loading}
              />
              <TextareaInput<SupplierFormInputs>
                label="Notes"
                name="notes"
                isRequired={false}
                register={register}
                className="col-span-2"
                errors={errors}
                disabled={loading}
              />
            </div>

            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={loading} title="Create Supplier" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
