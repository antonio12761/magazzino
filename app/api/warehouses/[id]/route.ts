import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

// Funzione GET per ottenere i dati di un warehouse specifico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const warehouseId = parseInt(id, 10);

    if (isNaN(warehouseId)) {
      return NextResponse.json(
        { message: "Invalid warehouse ID" },
        { status: 400 }
      );
    }

    const warehouse = await prisma.warehouse.findUnique({
      where: { id: warehouseId },
    });

    if (!warehouse) {
      return NextResponse.json(
        { message: "Warehouse not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(warehouse, { status: 200 });
  } catch (error) {
    console.error("Errore durante il caricamento del warehouse:", error);
    return NextResponse.json(
      { message: "Failed to load warehouse" },
      { status: 500 }
    );
  }
}

// Funzione PUT per aggiornare i dati di un warehouse
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const warehouseId = parseInt(id, 10);
    if (isNaN(warehouseId)) {
      return NextResponse.json({ message: "Invalid warehouse ID" }, { status: 400 });
    }

    const { title, location, description, type } = await request.json();

    // Validazione dei campi obbligatori
    if (!title || !location || !description || !type) {
      return NextResponse.json(
        { message: "Title, location, description, and type are required!" },
        { status: 400 }
      );
    }

    // Aggiorna il warehouse nel database
    const updatedWarehouse = await prisma.warehouse.update({
      where: { id: warehouseId },
      data: { title, location, description, warehouseType: type }, // warehouseType è il campo nel DB
    });

    return NextResponse.json(updatedWarehouse, { status: 200 });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del warehouse:", error);
    return NextResponse.json({ message: "Failed to update warehouse" }, { status: 500 });
  }
}

// Funzione DELETE per eliminare un warehouse specifico
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const warehouseId = parseInt(id, 10);

    if (isNaN(warehouseId)) {
      return NextResponse.json(
        { message: "Invalid warehouse ID" },
        { status: 400 }
      );
    }

    // Elimina il warehouse dal database
    await prisma.warehouse.delete({
      where: { id: warehouseId },
    });

    return NextResponse.json(
      { message: "Warehouse deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore durante l'eliminazione del warehouse:", error);
    return NextResponse.json(
      { message: "Failed to delete warehouse." },
      { status: 500 }
    );
  }
}
