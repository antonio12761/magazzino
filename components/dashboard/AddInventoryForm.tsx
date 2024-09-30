import SelectInput from "../FormInputs/SelectInput";
import SubmitButton from "../FormInputs/SubmitButton";
import TextareaInput from "../FormInputs/TextareaInput";
import TextInput from "../FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";
import toast from "react-hot-toast";

// Definisci il tipo specifico per AddInventoryForm
type FormData = {
  addStockQty: number;
  warehouseId: string;
  itemId: string;
  notes: string;
  referenceNumber: number;
};

type Warehouse = {
  id: string;
  title: string;
};

type Item = {
  id: string;
  title: string;
};

export default function AddInventoryForm() {
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [dataLoading, setDataLoading] = useState(true); // Stato per monitorare il caricamento

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Fetch data for warehouses and items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehousesResponse = await fetch("/api/warehouses");
        const itemsResponse = await fetch("/api/items");

        if (!warehousesResponse.ok || !itemsResponse.ok) {
          throw new Error("Failed to load data");
        }

        const warehousesData = await warehousesResponse.json();
        const itemsData = await itemsResponse.json();

        setWarehouses(warehousesData);
        setItems(itemsData);
      } catch (error) {
        console.error("Failed to load data:", error);
        toast.error("Failed to load data");
      } finally {
        setDataLoading(false); // Dati caricati
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const parsedData = {
      ...data,
      addStockQty: Number(data.addStockQty), // Assicurati che sia un numero
      itemId: Number(data.itemId),
      referenceNumber: String(data.referenceNumber), // Converti il numero di riferimento in stringa
    };

    console.log("Dati inviati:", parsedData); // Verifica cosa viene effettivamente inviato
    try {
      await makePostRequest({
        setLoading,
        endpoint: "api/adjustments/add",
        data: parsedData,
        resourceName: "Add Stock Adjustment",
        reset,
      });
    } catch (error) {
      console.error("Error response:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      {dataLoading ? (
        <p>Loading data...</p> // Mostra un messaggio durante il caricamento
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <SelectInput<FormData>
              label="Select the Item"
              name="itemId"
              isRequired={true}
              register={register}
              options={items.map((item) => ({
                label: item.title,
                value: item.id.toString(),
              }))}
              errors={errors}
              className="col-span-2 sm:col-span-1"
            />
            <TextInput<FormData>
              label="Reference Number"
              name="referenceNumber"
              isRequired={true}
              register={register}
              type="number"
              errors={errors}
              className="col-span-2 sm:col-span-1"
            />
            <TextInput<FormData>
              label="Enter Quantity of Stock to Add"
              name="addStockQty"
              isRequired={true}
              register={register}
              type="number"
              errors={errors}
              className="col-span-2 sm:col-span-1"
            />
            <SelectInput<FormData>
              label="Select the Warehouse"
              name="warehouseId"
              isRequired={true}
              register={register}
              options={warehouses.map((warehouse) => ({
                label: warehouse.title,
                value: warehouse.id,
              }))}
              errors={errors}
              className="col-span-2 sm:col-span-1"
            />
            <TextareaInput<FormData>
              label="Adjustment Notes"
              name="notes"
              isRequired={true}
              register={register}
              errors={errors}
              className="col-span-2"
            />
          </div>
          <div className="flex justify-center">
            <SubmitButton isLoading={loading} title="Add Stock" />
          </div>
        </form>
      )}
    </div>
  );
}
