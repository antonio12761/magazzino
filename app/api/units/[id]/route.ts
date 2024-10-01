// app/api/units/[id]/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const unitId = parseInt(id, 10);

    if (isNaN(unitId)) {
      return NextResponse.json({ message: "Invalid unit ID" }, { status: 400 });
    }

    const unit = await prisma.unit.findUnique({
      where: { id: unitId },
    });

    if (!unit) {
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });
    }

    return NextResponse.json(unit, { status: 200 });
  } catch (error) {
    console.error("Errore durante il recupero dell'unità:", error);
    return NextResponse.json(
      { message: "Failed to fetch unit" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const unitId = parseInt(id, 10);

    if (isNaN(unitId)) {
      return NextResponse.json({ message: "Invalid unit ID" }, { status: 400 });
    }

    const { title, abbreviation } = await request.json();

    if (!title || !abbreviation) {
      return NextResponse.json(
        { message: "Title and abbreviation are required!" },
        { status: 400 }
      );
    }

    const updatedUnit = await prisma.unit.update({
      where: { id: unitId },
      data: { title, abbreviation },
    });

    return NextResponse.json(
      { message: "Unit updated successfully!", updatedUnit },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'unità:", error);
    return NextResponse.json(
      { message: "Failed to update unit." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const unitId = parseInt(id, 10);

    if (isNaN(unitId)) {
      return NextResponse.json({ message: "Invalid unit ID" }, { status: 400 });
    }

    await prisma.unit.delete({
      where: { id: unitId },
    });

    return NextResponse.json(
      { message: "Unit deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore durante l'eliminazione dell'unità:", error);
    return NextResponse.json(
      { message: "Failed to delete unit." },
      { status: 500 }
    );
  }
}
