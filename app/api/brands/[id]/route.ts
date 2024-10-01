// app/api/brands/[id]/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const brandId = parseInt(id, 10);

    if (isNaN(brandId)) {
      return NextResponse.json(
        { message: "Invalid brand ID" },
        { status: 400 }
      );
    }

    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(brand, { status: 200 });
  } catch (error) {
    console.error("Errore durante il recupero del brand:", error);
    return NextResponse.json(
      { message: "Failed to fetch brand" },
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
    const brandId = parseInt(id, 10);

    if (isNaN(brandId)) {
      return NextResponse.json(
        { message: "Invalid brand ID" },
        { status: 400 }
      );
    }

    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required!" },
        { status: 400 }
      );
    }

    const updatedBrand = await prisma.brand.update({
      where: { id: brandId },
      data: { title },
    });

    return NextResponse.json(
      { message: "Brand updated successfully!", updatedBrand },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore durante l'aggiornamento del brand:", error);
    return NextResponse.json(
      { message: "Failed to update brand." },
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
    const brandId = parseInt(id, 10);

    if (isNaN(brandId)) {
      return NextResponse.json(
        { message: "Invalid brand ID" },
        { status: 400 }
      );
    }

    await prisma.brand.delete({
      where: { id: brandId },
    });

    return NextResponse.json(
      { message: "Brand deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore durante l'eliminazione del brand:", error);
    return NextResponse.json(
      { message: "Failed to delete brand." },
      { status: 500 }
    );
  }
}
