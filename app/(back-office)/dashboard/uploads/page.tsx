"use client";

import { useState } from "react";

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploaded file:", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.message || "Failed to import data");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred during the upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Import CSV Data</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
