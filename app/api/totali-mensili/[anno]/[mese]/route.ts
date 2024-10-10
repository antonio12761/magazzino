// api/totali-mensili/[anno]/[mese]

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assicurati che Prisma sia configurato correttamente

export async function GET(
  request: NextRequest,
  { params }: { params: { anno: string; mese: string } }
) {
  const { anno, mese } = params;

  try {
    // Recupera i totali mensili dal database
    const totaliMensili = await prisma.totali_mensili.findFirst({
      where: {
        anno: parseInt(anno),
        mese: parseInt(mese),
      },
    });

    console.log("Anno:", anno, "Mese:", mese);
    // Log dei valori recuperati
    console.log(`Totali mensili per ${anno}-${mese}:`, totaliMensili);

    if (!totaliMensili) {
      return NextResponse.json(
        { message: "Totali mensili non trovati" },
        { status: 404 }
      );
    }

    return NextResponse.json(totaliMensili, { status: 200 });
  } catch (error) {
    console.error("Errore durante il recupero dei totali mensili:", error);
    return NextResponse.json(
      { message: "Errore interno del server" },
      { status: 500 }
    );
  }
}
