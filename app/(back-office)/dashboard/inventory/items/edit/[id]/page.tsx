"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextInput from "../../../../../../../components/FormInputs/TextInput";
import TextareaInput from "../../../../../../../components/FormInputs/TextareaInput";
import SubmitButton from "../../../../../../../components/FormInputs/SubmitButton";
import FormHeader from "../../../../../../../components/FormInputs/FormHeader";
import SelectInput from "../../../../../../../components/FormInputs/SelectInput";
import toast from "react-hot-toast";

type Category = {
  id: string;
  title: string;
};
type Brand = {
  id: string;
  title: string;
};
type Unit = {
  id: string;
  title: string;
};
type Warehouse = {
  id: string;
  title: string;
};
type Supplier = {
  id: string;
  title: string;
};

// Definizione dello schema Zod per la validazione del form
const itemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().min(1, "Barcode is required"),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
  buyingPrice: z.number().positive("Buying price must be greater than 0"),
  sellingPrice: z.number().positive("Selling price must be greater than 0"),
  reOrderPoint: z.number().min(1, "Reorder point must be greater than 0"),
  weight: z.number().positive("Weight must be greater than 0"),
  dimensions: z.string().min(1, "Dimensions are required"),
  taxRate: z.number().min(0).max(100, "Tax rate must be between 0 and 100"),
  categoryId: z.number().positive("Category is required"),
  brandId: z.number().positive("Brand is required"),
  unitId: z.number().positive("Unit is required"),
  warehouseId: z.number().positive("Warehouse is required"),
  supplierId: z.number().positive("Supplier is required"),
  description: z.string().optional(),
  notes: z.string().optional(),
});

// Tipi per i dati del form derivati da Zod
type FormData = z.infer<typeof itemSchema>;

export default function EditItem() {
  const { id } = useParams(); // Ottiene l'ID dell'item dall'URL
  const router = useRouter(); // Usa il router per gestire le redirezioni
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(itemSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemResponse = await fetch(`/api/items/${id}`);
        const itemData = await itemResponse.json();

        // Imposta i valori iniziali per l'item che viene editato
        setValue("title", itemData.title);
        setValue("sku", itemData.sku);
        setValue("barcode", itemData.barcode);
        setValue("quantity", itemData.quantity);
        setValue("buyingPrice", itemData.buyingPrice);
        setValue("sellingPrice", itemData.sellingPrice);
        setValue("reOrderPoint", itemData.reOrderPoint);
        setValue("weight", itemData.weight);
        setValue("dimensions", itemData.dimensions);
        setValue("taxRate", itemData.taxRate);
        setValue("categoryId", itemData.categoryId);
        setValue("brandId", itemData.brandId);
        setValue("unitId", itemData.unitId);
        setValue("warehouseId", itemData.warehouseId);
        setValue("supplierId", itemData.supplierId);
        setValue("description", itemData.description || "");
        setValue("notes", itemData.notes || "");

        // Fetch data per categorie, brands, units, etc.
        const [
          categoriesResponse,
          brandsResponse,
          unitsResponse,
          warehousesResponse,
          suppliersResponse,
        ] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/brands"),
          fetch("/api/units"),
          fetch("/api/warehouses"),
          fetch("/api/suppliers"),
        ]);

        const [
          categoriesData,
          brandsData,
          unitsData,
          warehousesData,
          suppliersData,
        ] = await Promise.all([
          categoriesResponse.json(),
          brandsResponse.json(),
          unitsResponse.json(),
          warehousesResponse.json(),
          suppliersResponse.json(),
        ]);

        setCategories(categoriesData);
        setBrands(brandsData);
        setUnits(unitsData);
        setWarehouses(warehousesData);
        setSuppliers(suppliersData);

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load item data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Item updated successfully!");
        router.push("/dashboard/inventory/items");
      } else {
        toast.error("Failed to update item");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <FormHeader title="Edit Item" href="/dashboard/inventory/items" />
      <div className="p-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <TextInput<FormData>
                label="Item Title"
                name="title"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
              />
              <TextInput<FormData>
                label="SKU"
                name="sku"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
              />
              <TextInput<FormData>
                label="Barcode"
                name="barcode"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
              />
              <TextInput<FormData>
                label="Quantity"
                name="quantity"
                isRequired={true}
                register={register}
                type="number"
                errors={errors}
              />
              <TextInput<FormData>
                label="Selling Price"
                name="sellingPrice"
                isRequired={true}
                register={register}
                type="number"
                errors={errors}
              />
              <TextInput<FormData>
                label="Buying Price"
                name="buyingPrice"
                isRequired={true}
                register={register}
                type="number"
                errors={errors}
              />
              <TextInput<FormData>
                label="Reorder Point"
                name="reOrderPoint"
                isRequired={true}
                register={register}
                type="number"
                errors={errors}
              />
              <TextInput<FormData>
                label="Weight"
                name="weight"
                isRequired={true}
                register={register}
                type="number"
                errors={errors}
              />
              <TextInput<FormData>
                label="Dimensions"
                name="dimensions"
                isRequired={true}
                register={register}
                type="text"
                errors={errors}
              />
              <TextInput<FormData>
                label="Tax Rate"
                name="taxRate"
                isRequired={true}
                register={register}
                type="number"
                errors={errors}
              />
              <SelectInput<FormData>
                label="Select Category"
                name="categoryId"
                isRequired={true}
                register={register}
                options={categories.map((category) => ({
                  label: category.title,
                  value: category.id,
                }))}
                errors={errors}
              />
              <SelectInput<FormData>
                label="Select Brand"
                name="brandId"
                isRequired={true}
                register={register}
                options={brands.map((brand) => ({
                  label: brand.title,
                  value: brand.id,
                }))}
                errors={errors}
              />
              <SelectInput<FormData>
                label="Select Unit"
                name="unitId"
                isRequired={true}
                register={register}
                options={units.map((unit) => ({
                  label: unit.title,
                  value: unit.id,
                }))}
                errors={errors}
              />
              <SelectInput<FormData>
                label="Select Warehouse"
                name="warehouseId"
                isRequired={true}
                register={register}
                options={warehouses.map((warehouse) => ({
                  label: warehouse.title,
                  value: warehouse.id,
                }))}
                errors={errors}
              />
              <SelectInput<FormData>
                label="Select Supplier"
                name="supplierId"
                isRequired={true}
                register={register}
                options={suppliers.map((supplier) => ({
                  label: supplier.title,
                  value: supplier.id,
                }))}
                errors={errors}
              />
              <TextareaInput<FormData>
                label="Description"
                name="description"
                isRequired={false}
                register={register}
                errors={errors}
              />
              <TextareaInput<FormData>
                label="Notes"
                name="notes"
                isRequired={false}
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex justify-center mt-6">
              <SubmitButton isLoading={false} title="Update Item" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
