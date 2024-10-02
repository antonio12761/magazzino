import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Funzione per creare un nuovo fornitore (POST)
export async function POST(request: Request) {
  try {
    const {
      title,
      phone,
      email,
      address,
      contactPerson,
      supplierCode,
      paymentTerms,
      taxID,
      notes,
    } = await request.json();

    // Controlla se i campi obbligatori sono presenti
    if (
      !title ||
      !phone ||
      !email ||
      !address ||
      !contactPerson ||
      !supplierCode ||
      !paymentTerms ||
      !taxID
    ) {
      return NextResponse.json(
        { message: "All required fields must be provided!" },
        { status: 400 }
      );
    }

    // Creazione del fornitore nel database tramite Prisma
    const supplier = await prisma.supplier.create({
      data: {
        title,
        phone,
        email,
        address,
        contactPerson,
        supplierCode,
        paymentTerms,
        taxID,
        notes,
      },
    });

    return NextResponse.json({ supplier }, { status: 201 });
  } catch (error) {
    console.error("Errore durante la creazione del fornitore:", error);
    return NextResponse.json(
      { message: "Failed to create a supplier. Please try again later." },
      { status: 500 }
    );
  }
}

// Funzione per ottenere tutti i fornitori (GET)
export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany();
    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    console.error("Failed to load suppliers", error);
    return NextResponse.json(
      { message: "Failed to load suppliers" },
      { status: 500 }
    );
  }
}