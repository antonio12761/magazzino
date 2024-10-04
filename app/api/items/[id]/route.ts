import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// Funzione GET per ottenere un singolo item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      return NextResponse.json({ message: "Invalid item ID" }, { status: 400 });
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { message: "Failed to fetch item" },
      { status: 500 }
    );
  }
}

// Funzione DELETE per eliminare un item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      return NextResponse.json({ message: "Invalid item ID" }, { status: 400 });
    }

    const deletedItem = await prisma.item.delete({
      where: { id: itemId },
    });

    return NextResponse.json(
      { message: "Item deleted successfully!", deletedItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { message: "Failed to delete item." },
      { status: 500 }
    );
  }
}

// Funzione PUT per aggiornare un item esistente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      return NextResponse.json({ message: "Invalid item ID" }, { status: 400 });
    }

    const data = await request.json();
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data,
    });

    return NextResponse.json(
      { message: "Item updated successfully!", updatedItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { message: "Failed to update item." },
      { status: 500 }
    );
  }
}
