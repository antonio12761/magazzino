import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type ImageInputProps = {
  label: string;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  className?: string;
  maxFileSizeMB?: number; // Aggiunta per personalizzare la dimensione massima del file
};

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  maxFileSizeMB = 1, // Valore di default di 1MB
}: ImageInputProps) {
  const [fileSizeError, setFileSizeError] = useState<string | null>(null); // Stato per l'errore

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex items-center space-x-2 bg-slate-900 rounded-md shadow text-white py-2 px-4 hover:bg-slate-700"
          >
            <Pencil className="w-4 h-4" />
            <span className="text-sm">Change Image</span>
          </button>
        )}
      </div>

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Uploaded image"
          width={1000}
          height={667}
          className="w-full h-64 object-cover rounded-md"
        />
      ) : (
        <>
          <div className="border-dashed border-2 border-gray-300 rounded-md p-4">
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFileSizeError(null); // Reset dell'errore
                if (res && res.length > 0) {
                  setImageUrl(res[0].url); // Salva l'URL dell'immagine
                  console.log("Files: ", res);
                  console.log("Upload Completed");
                }
              }}
              onUploadError={(error) => {
                console.error("Errore dettagliato:", error);
                // Gestione errore dimensione file
                if (error.message.includes("FileSizeMismatch")) {
                  setFileSizeError(`File size exceeds ${maxFileSizeMB}MB.`); // Messaggio di errore dimensione
                } else {
                  setFileSizeError("Error uploading the file.");
                }
              }}
            />
            {fileSizeError && (
              <p className="text-red-600 text-sm text-center mt-2">
                {fileSizeError}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
