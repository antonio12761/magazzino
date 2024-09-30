import toast from "react-hot-toast";

// Tipo generico per i parametri di `makePostRequest`
type MakePostRequestParams<T> = {
  setLoading: (value: boolean) => void; // Funzione che imposta lo stato di caricamento
  endpoint: string; // Endpoint API
  data: T; // Tipo generico per i dati da inviare
  resourceName: string; // Nome della risorsa da creare
  reset: () => void; // Funzione per resettare il modulo
};

// Funzione per fare una richiesta POST generica
export async function makePostRequest<T>({
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
}: MakePostRequestParams<T>) {
  try {
    setLoading(true); // Imposta lo stato di caricamento su true
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Prende la base URL dall'ambiente
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Invio dei dati come JSON
    });

    if (response.ok) {
      setLoading(false); // Imposta lo stato di caricamento su false
      toast.success(`New ${resourceName} Created Successfully`); // Messaggio di successo
      reset(); // Resetta il modulo
    } else {
      setLoading(false);
      const errorDetails = await response.json(); // Leggi i dettagli dell'errore dalla risposta
      console.error("Error response details:", errorDetails); // Logga i dettagli dell'errore
      if (response.status === 409) {
        toast.error("The Giving Warehouse Stock is NOT Enough"); // Errore specifico
      } else {
        toast.error(`Something went wrong: ${errorDetails.message || 'Unknown error'}`); // Messaggio di errore migliorato
      }
    }
  } catch (error) {
    setLoading(false);
    console.error("Error during request:", error); // Log dell'errore
    toast.error("Failed to create resource. Please try again."); // Messaggio di errore
  }
}


