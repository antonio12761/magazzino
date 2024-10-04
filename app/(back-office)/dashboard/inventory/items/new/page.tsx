"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { makePostRequest } from "@/lib/apiRequest";
import toast from "react-hot-toast";
import FormHeader from "@/components/FormInputs/FormHeader";

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
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().min(1, "Brand is required"),
  unitId: z.string().min(1, "Unit is required"),
  warehouseId: z.string().min(1, "Warehouse is required"),
  supplierId: z.string().min(1, "Supplier is required"),
  description: z.string().optional(),
  notes: z.string().optional(),
});

// Tipi per i dati del form derivati da Zod
type FormData = z.infer<typeof itemSchema>;

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
type Supplier = {
  id: string;
  title: string;
};
type Warehouse = {
  id: string;
  title: string;
};

export default function ItemsNewForm() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const itemSchema = z.object({
    title: z.string().min(1, "Title is required"),
    sku: z.string().min(1, "SKU is required"),
    barcode: z.string().min(1, "Barcode is required"),
    quantity: z
      .string()
      .min(1, "Quantity is required")
      .transform((val) => parseInt(val, 10)) // Trasforma in numero
      .refine((val) => !isNaN(val), {
        message: "Quantity must be a valid number",
      }),
    buyingPrice: z
      .string()
      .min(1, "Buying price is required")
      .transform((val) => parseFloat(val)) // Trasforma in numero decimale
      .refine((val) => !isNaN(val), {
        message: "Buying price must be a valid number",
      }),
    sellingPrice: z
      .string()
      .min(1, "Selling price is required")
      .transform((val) => parseFloat(val)) // Trasforma in numero decimale
      .refine((val) => !isNaN(val), {
        message: "Selling price must be a valid number",
      }),
    reOrderPoint: z
      .string()
      .min(1, "Reorder point is required")
      .transform((val) => parseInt(val, 10)) // Trasforma in numero
      .refine((val) => !isNaN(val), {
        message: "Reorder point must be a valid number",
      }),
    weight: z
      .string()
      .min(1, "Weight is required")
      .transform((val) => parseFloat(val)) // Trasforma in numero decimale
      .refine((val) => !isNaN(val), {
        message: "Weight must be a valid number",
      }),
    dimensions: z.string().min(1, "Dimensions are required"),
    taxRate: z
      .string()
      .min(1, "Tax rate is required")
      .transform((val) => parseFloat(val)) // Trasforma in numero decimale
      .refine((val) => !isNaN(val), {
        message: "Tax rate must be a valid number",
      })
      .refine((val) => val >= 0 && val <= 100, {
        message: "Tax rate must be between 0 and 100",
      }),
    // Trasforma tutti gli ID da stringa a numero
    categoryId: z
      .string()
      .min(1, "Category is required")
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "Category must be a valid number",
      }),
    brandId: z
      .string()
      .min(1, "Brand is required")
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "Brand must be a valid number",
      }),
    unitId: z
      .string()
      .min(1, "Unit is required")
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "Unit must be a valid number",
      }),
    warehouseId: z
      .string()
      .min(1, "Warehouse is required")
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "Warehouse must be a valid number",
      }),
    supplierId: z
      .string()
      .min(1, "Supplier is required")
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "Supplier must be a valid number",
      }),
    description: z.string().optional(),
    notes: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(itemSchema), // Usa Zod come validatore
  });

  // Fetch categories, brands, units, warehouses, suppliers
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data:", data);

    const preparedData = {
      ...data,
      description: data.description || null, // Converte le stringhe vuote in null
      notes: data.notes || null, // Converte le stringhe vuote in null
    };

    try {
      await makePostRequest({
        setLoading,
        endpoint: "/api/items",
        data: preparedData,
        resourceName: "New Item",
        reset,
      });
      toast.success("Item successfully created!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <FormHeader title="New Item" href="/dashboard/inventory/items" />
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
          <div className="flex justify-center">
            <SubmitButton isLoading={loading} title="Create Item" />
          </div>
        </form>
      </div>
    </>
  );
}
