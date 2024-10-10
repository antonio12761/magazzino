import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { parse } from "csv-parse";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

// Configura multer per gestire l'upload
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    if (file.mimetype !== "text/csv") {
      return cb(new Error("Only CSV files are allowed"));
    }
    cb(null, true);
  },
});

const uploadMiddleware = upload.single("file");

// Promisify multer middleware
function runMiddleware(req: any, res: any, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Parsing the CSV file
async function parseCSV(buffer: Buffer) {
  return new Promise<any[]>((resolve, reject) => {
    const data: any[] = [];
    const parser = parse({
      columns: true, // Assicurati che la prima riga venga usata come intestazione
      delimiter: ",",
      skip_empty_lines: true, // Salta le righe vuote
    });

    parser.on("data", (row) => data.push(row));
    parser.on("end", () => resolve(data));
    parser.on("error", (err) => reject(err));
    parser.write(buffer);
    parser.end();
  });
}

export async function POST(req: NextRequest) {
  return await handleUpload(req); // Chiamata alla funzione di gestione
}

async function handleUpload(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const data = await parseCSV(Buffer.from(buffer));
    console.log("Parsed CSV data:", data);

    const entries = data.map((row) => {
      const date = new Date(row.giorno);

      return {
        giorno: isNaN(date.getTime()) ? new Date() : date,
        incasso: row.incasso ? new Decimal(row.incasso) : new Decimal(0),
        elettronico: row.elettronico
          ? new Decimal(row.elettronico)
          : new Decimal(0),
        contanti: row.contanti ? new Decimal(row.contanti) : new Decimal(0),
      };
    });

    console.log("Entries to insert into DB:", entries);

    try {
      await prisma.incasso.createMany({
        data: entries,
      });
      console.log("Data successfully inserted into the database");
    } catch (error) {
      console.error("Error inserting data into the database:", error);
    }

    return NextResponse.json({ message: "Data imported successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred during the import" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Multer gestisce il parsing del corpo della richiesta
  },
};
