// api/items/routeModule.ts

import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { z } from "zod";

// Definisci lo schema Zod per la validazione dei dati
const itemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().min(1, "Barcode is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  buyingPrice: z.number().positive("Buying price must be a positive number"),
  sellingPrice: z.number().positive("Selling price must be a positive number"),
  reOrderPoint: z
    .number()
    .int()
    .positive("Reorder point must be a positive integer"),
  weight: z.number().positive("Weight must be a positive number"),
  dimensions: z.string().min(1, "Dimensions are required"),
  taxRate: z.number().min(0).max(100, "Tax rate must be between 0 and 100"),
  categoryId: z.number().int().positive("Invalid category ID"),
  brandId: z.number().int().positive("Invalid brand ID"),
  unitId: z.number().int().positive("Invalid unit ID"),
  supplierId: z.number().int().positive("Invalid supplier ID"),
  warehouseId: z.number().int().positive("Invalid warehouse ID"),
  description: z.string().nullable().optional(), // Permetti `null` o una stringa
  notes: z.string().nullable().optional(), // Permetti `null` o una stringa
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("Received Data:", data);

    // Validazione con Zod
    const validatedData = itemSchema.safeParse(data);

    if (!validatedData.success) {
      console.error("Validation Errors:", validatedData.error.errors); // Stampa gli errori di validazione
      return NextResponse.json(
        { message: "Validation failed", errors: validatedData.error.errors },
        { status: 400 }
      );
    }

    // Creazione dell'item nel database
    const item = await prisma.item.create({
      data: {
        title: validatedData.data.title,
        sku: validatedData.data.sku,
        barcode: validatedData.data.barcode,
        quantity: validatedData.data.quantity,
        buyingPrice: validatedData.data.buyingPrice,
        sellingPrice: validatedData.data.sellingPrice,
        reOrderPoint: validatedData.data.reOrderPoint,
        weight: validatedData.data.weight,
        dimensions: validatedData.data.dimensions,
        taxRate: validatedData.data.taxRate,
        description: validatedData.data.description || null,
        notes: validatedData.data.notes || null,
        category: { connect: { id: validatedData.data.categoryId } },
        unit: { connect: { id: validatedData.data.unitId } },
        brand: { connect: { id: validatedData.data.brandId } },
        supplier: { connect: { id: validatedData.data.supplierId } },
        warehouse: { connect: { id: validatedData.data.warehouseId } },
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { message: "Failed to create the item", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      include: {
        category: true,
        unit: true,
        brand: true,
        supplier: true,
        warehouse: true,
      },
    });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load items. Please try again later." },
      { status: 500 }
    );
  }
}
