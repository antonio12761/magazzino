import SelectInput from "../FormInputs/SelectInput";
import SubmitButton from "../FormInputs/SubmitButton";
import TextareaInput from "../FormInputs/TextareaInput";
import TextInput from "../FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";
import toast from "react-hot-toast";

// Definizione dei tipi per i dati
type Warehouse = {
  id: number;
  title: string;
};

type Item = {
  id: number;
  title: string;
};

// Definizione del tipo per il form di trasferimento
type TransferFormData = {
  transferStockQty: number;
  itemId: string;
  givingWarehouseId: string;
  recievingWarehouseId: string;
  notes: string;
  referenceNumber: number;
};

export default function TransferInventoryForm() {
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]); // Array di Warehouse
  const [items, setItems] = useState<Item[]>([]); // Array di Item
  const [dataLoading, setDataLoading] = useState(true); // Stato di caricamento dei dati

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransferFormData>();

  // Funzione per caricare i magazzini e gli articoli dal database
  const fetchData = async () => {
    setDataLoading(true);
    try {
      const warehousesResponse = await fetch("/api/warehouses");
      const itemsResponse = await fetch("/api/items");

      const warehousesData: Warehouse[] = await warehousesResponse.json();
      const itemsData: Item[] = await itemsResponse.json();

      console.log("Warehouses Data: ", warehousesData);
      console.log("Items Data: ", itemsData);

      setWarehouses(warehousesData);
      setItems(itemsData);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setDataLoading(false);
    }
  };

  // Effetto per caricare i dati quando il componente viene montato
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const warehousesResponse = await fetch("/api/warehouses");
        const itemsResponse = await fetch("/api/items");
  
        if (!warehousesResponse.ok || !itemsResponse.ok) {
          throw new Error("Failed to load data from the server");
        }
  
        const warehousesData = await warehousesResponse.json();
        const itemsData = await itemsResponse.json();
  
        console.log("Loaded Warehouses:", warehousesData);
        console.log("Loaded Items:", itemsData);
  
        setWarehouses(warehousesData);
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setDataLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const onSubmit: SubmitHandler<TransferFormData> = async (data) => {
    const parsedData = {
      ...data,
      transferStockQty: Number(data.transferStockQty), // Conversione a numero
      referenceNumber: String(data.referenceNumber), // Assicurati che il numero di riferimento sia una stringa
    };

    const endpoint = "api/adjustments/transfer";
    const resourceName = "Transfer Adjustment";
    try {
      await makePostRequest({
        setLoading,
        endpoint,
        data: parsedData,
        resourceName,
        reset,
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      {dataLoading ? (
        <p>Loading data...</p> // Messaggio di caricamento
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput<TransferFormData>
              label="Reference Number"
              name="referenceNumber"
              isRequired={true}
              register={register}
              type="number"
              errors={errors}
              className="col-span-2"
            />
            <SelectInput<TransferFormData>
              label="Select the Item"
              name="itemId"
              isRequired={true}
              register={register}
              options={items.map((item) => ({
                label: item.title,
                value: String(item.id),
              }))}
              errors={errors}
              className="col-span-2 sm:col-span-1"
            />
            <TextInput<TransferFormData>
              label="Enter Quantity of Stock to Transfer"
              name="transferStockQty"
              isRequired={true}
              register={register}
              type="number"
              errors={errors}
              className="col-span-2 sm:col-span-1"
            />
            <SelectInput<TransferFormData>
              label="Select the Warehouse that is giving the Stock"
              name="givingWarehouseId"
              isRequired={true}
              register={register}
              options={warehouses.map((warehouse) => ({
                label: warehouse.title,
                value: String(warehouse.id),
              }))}
              errors={errors}
              className="col-span-2 sm:col-span-1"
            />
            <SelectInput<TransferFormData>
              label="Select the Warehouse that is receiving the Stock"
              name="recievingWarehouseId"
              isRequired={true}
              register={register}
              options={warehouses.map((warehouse) => ({
                label: warehouse.title,
                value: String(warehouse.id),
              }))}
              errors={errors}
              className="col-span-2 sm:col-span-1"
            />
            <TextareaInput<TransferFormData>
              label="Transfer Notes"
              name="notes"
              isRequired={true}
              register={register}
              errors={errors}
              className="col-span-2"
            />
          </div>
          <div className="flex justify-center mt-4">
            <SubmitButton isLoading={loading} title="Transfer Stock" />
          </div>
        </form>
      )}
    </div>
  );
}
