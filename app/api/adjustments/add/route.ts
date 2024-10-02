import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { addStockQty, warehouseId, itemId, notes, referenceNumber } =
      await request.json();

    console.log("Dati ricevuti:", {
      addStockQty,
      warehouseId,
      itemId,
      notes,
      referenceNumber,
    }); // Verifica i dati ricevuti

    // Verifica dei campi mancanti
    const missingFields: string[] = [];
    if (!addStockQty) missingFields.push("addStockQty");
    if (!warehouseId) missingFields.push("warehouseId");
    if (!itemId) missingFields.push("itemId");
    if (!notes) missingFields.push("notes");
    if (!referenceNumber) missingFields.push("referenceNumber");

    // Se ci sono campi mancanti, ritorna un errore 400
    if (missingFields.length > 0) {
      console.log("Campi mancanti:", missingFields);
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Inserisci nel database
    const adjustment = await prisma.addStockAdjustment.create({
      data: {
        addStockQty: parseInt(addStockQty), // Assicurati che sia un numero
        warehouseId: parseInt(warehouseId), // Assicurati che sia un numero
        itemId: parseInt(itemId), // Assicurati che sia un numero
        notes,
        referenceNumber: referenceNumber.toString(), // Assicurati che sia una stringa
      },
    });

    console.log("Adjustment Successfully :)", adjustment);

    return NextResponse.json({ adjustment }, { status: 201 });
  } catch (error) {
    console.error("Failed to create an adjustment!", error);
    return NextResponse.json(
      { message: "Failed to create an adjustment. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const adjustments = await prisma.addStockAdjustment.findMany({
      include: {
        item: true,
        warehouse: true,
      },
    });

    return NextResponse.json(adjustments, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch adjustments!", error);
    return NextResponse.json(
      { message: "Failed to load adjustments" },
      { status: 500 }
    );
  }
}