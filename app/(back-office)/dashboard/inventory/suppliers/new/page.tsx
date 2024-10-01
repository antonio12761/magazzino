"use client";

import FormHeader from "@/components/FormInputs/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import SelectInput from "@/components/FormInputs/SelectInput"; // Aggiungi import per SelectInput
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { makePostRequest } from "@/lib/apiRequest";

// Tipi per i dati del form
type SupplierFormInputs = {
  supplierId?: string; // Aggiungi supplierId come opzionale
  name: string;
  phone: string;
  email: string;
  address: string;
  contactPerson: string;
  supplierCode: string;
  paymentTerms: string;
  taxID: string;
  notes: string;
};

type Supplier = {
  id: string;
  name: string;
};

export default function NewSupplier() {
  const [loading, setLoading] = useState(false); // Stato di caricamento
  const [suppliers, setSuppliers] = useState<Supplier[]>([]); // Stato per i fornitori
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormInputs>();

  // Funzione per caricare i fornitori dall'API
  const fetchSuppliers = async () => {
    try {
      const response = await fetch("/api/suppliers");
      if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      toast.error("Failed to load suppliers");
      console.error("Error loading suppliers:", error);
    }
  };

  // Effetto per caricare i fornitori al montaggio del componente
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const onSubmit: SubmitHandler<SupplierFormInputs> = async (data) => {
    const url = "api/suppliers";
    const resourceName = "Supplier";

    try {
      await makePostRequest<SupplierFormInputs>({
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
    <>
      <FormHeader title="New Supplier" href="/dashboard/inventory" />
      <div className="p-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TextInput<SupplierFormInputs>
                label="Suppliers Name"
                name="name"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-2"
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Suppliers Phone"
                name="phone"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Suppliers Email"
                name="email"
                isRequired={true}
                register={register}
                type="email"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Suppliers Address"
                name="address"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-2"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Suppliers Contact Person"
                name="contactPerson"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Suppliers Code"
                name="supplierCode"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextInput<SupplierFormInputs>
                label="Suppliers TIN"
                name="taxID"
                isRequired={true}
                register={register}
                type="text"
                className="col-span-1"
                errors={errors}
                disabled={loading}
              />
              <TextareaInput<SupplierFormInputs>
                label="Suppliers Payment Terms"
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
                isRequired={true}
                register={register}
                className="col-span-2"
                errors={errors}
                disabled={loading}
              />
            </div>

            {/* Seleziona i fornitori caricati */}
            <SelectInput<SupplierFormInputs>
              label="Select Existing Supplier"
              name="supplierId"
              register={register}
              options={suppliers.map((supplier) => ({
                label: supplier.name,
                value: supplier.id,
              }))}
              errors={errors}
              className="col-span-2"
              isRequired={false}
            />

            <div className="flex justify-center ">
              <SubmitButton isLoading={loading} title="Create Supplier" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
