"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormHeader from "../../../../../../../components/FormInputs/FormHeader";
import SubmitButton from "../../../../../../../components/FormInputs/SubmitButton";
import TextInput from "../../../../../../../components/FormInputs/TextInput";
import TextareaInput from "../../../../../../../components/FormInputs/TextareaInput";

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

export default function EditSupplier() {
  const router = useRouter();
  const { id } = useParams(); // Ottiene l'ID dalla rotta

  const [loading, setLoading] = useState(true); // Stato di caricamento
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SupplierFormInputs>();

  // Carica i dati del fornitore dal server
  useEffect(() => {
    if (id) {
      const fetchSupplier = async () => {
        try {
          const response = await fetch(`/api/suppliers/${id}`);
          if (!response.ok) {
            throw new Error("Failed to load supplier data");
          }
          const data = await response.json();

          // Imposta i valori del form con i dati caricati
          setValue("title", data.title);
          setValue("phone", data.phone);
          setValue("email", data.email);
          setValue("address", data.address);
          setValue("contactPerson", data.contactPerson);
          setValue("supplierCode", data.supplierCode);
          setValue("paymentTerms", data.paymentTerms);
          setValue("taxID", data.taxID);
          setValue("notes", data.notes);

          setLoading(false);
        } catch (error) {
          console.error("Error loading supplier:", error);
          setLoading(false);
        }
      };

      fetchSupplier();
    }
  }, [id, setValue]);

  // Gestione dell'invio del form
  const onSubmit: SubmitHandler<SupplierFormInputs> = async (data) => {
    try {
      const response = await fetch(`/api/suppliers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/dashboard/inventory/suppliers"); // Torna alla lista dei fornitori
      } else {
        const errorData = await response.json();
        console.error("Failed to update supplier:", errorData.message);
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <FormHeader title="Edit Supplier" href="/dashboard/inventory/suppliers" />
      <div className="p-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <TextInput<SupplierFormInputs>
                label="Supplier Name"
                name="title"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-2"
              />
              <TextInput<SupplierFormInputs>
                label="Phone"
                name="phone"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-1"
              />
              <TextInput<SupplierFormInputs>
                label="Email"
                name="email"
                isRequired={true}
                register={register}
                type="email"
                errors={errors}
                className="col-span-1"
              />
              <TextInput<SupplierFormInputs>
                label="Address"
                name="address"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-2"
              />
              <TextInput<SupplierFormInputs>
                label="Contact Person"
                name="contactPerson"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-1"
              />
              <TextInput<SupplierFormInputs>
                label="Supplier Code"
                name="supplierCode"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-1"
              />
              <TextInput<SupplierFormInputs>
                label="Tax ID"
                name="taxID"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
                className="col-span-1"
              />
              <TextareaInput<SupplierFormInputs>
                label="Payment Terms"
                name="paymentTerms"
                isRequired={true}
                register={register}
                errors={errors}
                className="col-span-2"
              />
              <TextareaInput<SupplierFormInputs>
                label="Notes"
                name="notes"
                isRequired={false}
                register={register}
                errors={errors}
                className="col-span-2"
              />
            </div>
            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={false} title="Update Supplier" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
