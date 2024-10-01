// app/api/units/last/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const lastUnit = await prisma.unit.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(lastUnit);
  } catch (error) {
    console.error("Errore durante il caricamento dell'ultima unità:", error);
    return NextResponse.json(
      { message: "Errore durante il caricamento dell'ultima unità" },
      { status: 500 }
    );
  }
}
