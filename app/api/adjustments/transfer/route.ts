import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      transferStockQty,
      itemId,
      givingWarehouseId,
      recievingWarehouseId,
      notes,
      referenceNumber,
    } = await request.json();

    // Verifica dei campi mancanti
    const missingFields: string[] = [];
    if (!transferStockQty) missingFields.push("transferStockQty");
    if (!itemId) missingFields.push("itemId");
    if (!givingWarehouseId) missingFields.push("givingWarehouseId");
    if (!recievingWarehouseId) missingFields.push("recievingWarehouseId");
    if (!notes) missingFields.push("notes");
    if (!referenceNumber) missingFields.push("referenceNumber");

    // Se ci sono campi mancanti, ritorna un errore 400
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Inserisci nel database
    const adjustment = await prisma.transferStockAdjustment.create({
      data: {
        transferStockQty: parseInt(transferStockQty), // Assicurati che sia un numero intero
        itemId: parseInt(itemId), // Assicurati che sia un numero intero
        givingWarehouseId: parseInt(givingWarehouseId), // Assicurati che sia un numero intero
        recievingWarehouseId: parseInt(recievingWarehouseId), // Assicurati che sia un numero intero
        notes,
        referenceNumber: referenceNumber.toString(), // Assicurati che sia una stringa
      },
    });

    return NextResponse.json({ adjustment }, { status: 201 });
  } catch (error) {
    console.error("Failed to create an adjustment:", error);

    return NextResponse.json(
      { message: "Failed to create an adjustment. Please try again later." },
      { status: 500 }
    );
  }
}
