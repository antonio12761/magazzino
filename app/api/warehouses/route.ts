import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "../../../lib/prisma";

// Funzione POST per creare un nuovo warehouse
export async function POST(request: NextRequest) {
  try {
    const { title, location, description, type } = await request.json();

    // Validazione dei campi obbligatori
    if (!title || !location || !description || !type) {
      return NextResponse.json(
        { message: "Title, location, description, and type are required!" },
        { status: 400 }
      );
    }

    // Creazione di un nuovo warehouse nel database
    const warehouse = await prisma.warehouse.create({
      data: { 
        title, 
        location, 
        description, 
        warehouseType: type, // Il campo nel modello è `warehouseType`
      },
    });

    return NextResponse.json({ warehouse }, { status: 201 });
  } catch (error) {
    console.error("Errore durante la creazione del warehouse:", error);
    return NextResponse.json(
      { message: "Failed to create a warehouse. Please try again later." },
      { status: 500 }
    );
  }
}

// Funzione GET per ottenere tutti i warehouse
export async function GET() {
  try {
    // Recupera tutti i warehouse dal database
    const warehouses = await prisma.warehouse.findMany();
    return NextResponse.json(warehouses, { status: 200 });
  } catch (error) {
    console.error("Failed to load warehouses", error);
    return NextResponse.json(
      { message: "Failed to load warehouses" },
      { status: 500 }
    );
  }
}
