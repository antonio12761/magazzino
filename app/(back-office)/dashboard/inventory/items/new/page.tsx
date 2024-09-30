"use client";

import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";
import toast from "react-hot-toast";
import FormHeader from "@/components/dashboard/sidebar/FormHeader";

// Tipi per i dati del form
type FormData = {
  title: string;
  sku: string;
  barcode: string;
  description: string;
  quantity: number;
  categoryId: string;
  brandId: string;
  unitId: string;
  warehouseId: string;
  sellingPrice: number;
  buyingPrice: number;
};

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

export default function ItemsNewForm() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Fetch categories, brands, units, warehouses from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");

        const [
          categoriesResponse,
          brandsResponse,
          unitsResponse,
          warehousesResponse,
        ] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/brands"),
          fetch("/api/units"),
          fetch("/api/warehouses"),
        ]);

        // Verifica lo stato delle risposte
        if (
          !categoriesResponse.ok ||
          !brandsResponse.ok ||
          !unitsResponse.ok ||
          !warehousesResponse.ok
        ) {
          throw new Error("Error fetching data from one or more APIs");
        }

        // Parsing delle risposte
        const [categoriesData, brandsData, unitsData, warehousesData] =
          await Promise.all([
            categoriesResponse.json(),
            brandsResponse.json(),
            unitsResponse.json(),
            warehousesResponse.json(),
          ]);

        console.log("Categories Data:", categoriesData);
        console.log("Brands Data:", brandsData);
        console.log("Units Data:", unitsData);
        console.log("Warehouses Data:", warehousesData);

        setCategories(categoriesData);
        setBrands(brandsData);
        setUnits(unitsData);
        setWarehouses(warehousesData);
      } catch (error) {
        toast.error("Failed to load data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await makePostRequest({
        setLoading,
        endpoint: "/api/items/new",
        data,
        resourceName: "New Item",
        reset,
      });
      toast.success("Item successfully created!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
    {/** Header */}
    <FormHeader title="New Item" href="/dashboard/inventory" />
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
          <TextareaInput<FormData>
            label="Description"
            name="description"
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
