"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema di validazione
const spesaSchema = z.object({
  descrizione: z.string().min(1, "Descrizione obbligatoria"),
  importo: z.number().min(0, "Deve essere positivo"),
});

export default function NewSpesa() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Nuova Spesa</button>
      {modalOpen && (
        <div className="modal">
          <h2>Nuova Spesa</h2>
          <Formik
            initialValues={{ descrizione: "", importo: 0 }}
            validate={zodResolver(spesaSchema)}
            onSubmit={(values) => {
              console.log(values);
              setModalOpen(false);
            }}
          >
            <Form>
              <label>Descrizione</label>
              <Field name="descrizione" />
              <label>Importo</label>
              <Field type="number" name="importo" />
              <button type="submit">Salva</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}
