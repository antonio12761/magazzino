// app/api/brands/last/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const lastBrand = await prisma.brand.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!lastBrand) {
      return NextResponse.json({ message: "No brands found" }, { status: 404 });
    }

    return NextResponse.json(lastBrand, { status: 200 });
  } catch (error: any) {
    console.error("Failed to load last brand:", error);
    return NextResponse.json(
      { message: "Failed to load last brand", error: error.message },
      { status: 500 }
    );
  }
}
