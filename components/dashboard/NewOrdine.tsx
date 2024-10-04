"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema di validazione
const ordineSchema = z.object({
  fornitore: z.string().min(1, "Seleziona un fornitore"),
  layout: z.string().min(1, "Seleziona un layout"),
});

export default function NewOrdine() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Nuovo Ordine</button>
      {modalOpen && (
        <div className="modal">
          <h2>Nuovo Ordine</h2>
          <Formik
            initialValues={{ fornitore: "", layout: "" }}
            validate={zodResolver(ordineSchema)}
            onSubmit={(values) => {
              console.log(values);
              setModalOpen(false);
            }}
          >
            <Form>
              <label>Fornitore</label>
              <Field as="select" name="fornitore">
                <option value="">Seleziona fornitore</option>
                {/* Opzioni dinamiche */}
              </Field>
              <label>Layout</label>
              <Field as="select" name="layout">
                <option value="">Seleziona layout</option>
                {/* Opzioni dinamiche */}
              </Field>
              <button type="submit">Salva</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}
