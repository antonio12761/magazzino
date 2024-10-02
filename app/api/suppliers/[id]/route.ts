import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

// Funzione GET per ottenere un singolo fornitore in base al suo ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supplierId = parseInt(id, 10);

    if (isNaN(supplierId)) {
      return NextResponse.json(
        { message: "Invalid supplier ID" },
        { status: 400 }
      );
    }

    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(supplier, { status: 200 });
  } catch (error) {
    console.error("Errore durante il recupero del fornitore:", error);
    return NextResponse.json(
      { message: "Failed to fetch supplier" },
      { status: 500 }
    );
  }
}

// Funzione PUT per aggiornare i dati di un fornitore
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supplierId = parseInt(id, 10);

    if (isNaN(supplierId)) {
      return NextResponse.json(
        { message: "Invalid supplier ID" },
        { status: 400 }
      );
    }

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

    const updatedSupplier = await prisma.supplier.update({
      where: { id: supplierId },
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

    return NextResponse.json(
      { message: "Supplier updated successfully!", updatedSupplier },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore durante l'aggiornamento del fornitore:", error);
    return NextResponse.json(
      { message: "Failed to update supplier." },
      { status: 500 }
    );
  }
}

// Funzione DELETE per eliminare un fornitore
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supplierId = parseInt(id, 10);

    if (isNaN(supplierId)) {
      return NextResponse.json(
        { message: "Invalid supplier ID" },
        { status: 400 }
      );
    }

    await prisma.supplier.delete({
      where: { id: supplierId },
    });

    return NextResponse.json(
      { message: "Supplier deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore durante l'eliminazione del fornitore:", error);
    return NextResponse.json(
      { message: "Failed to delete supplier." },
      { status: 500 }
    );
  }
}
