import { PrismaClient } from '@prisma/client';
import { processMonthlyTotals } from '../app/utils/processMonthlyTotals'; // Assicurati che il percorso sia corretto

const prisma = new PrismaClient();

async function main() {
  console.log('Inizio popolamento della tabella totali_mensili...');
  await processMonthlyTotals(); // Richiama la funzione per calcolare i totali e popolare la tabella
  console.log('Popolamento completato con successo.');
  await prisma.$disconnect(); // Chiudi la connessione a Prisma
}

main().catch((e) => {
  console.error('Errore durante il popolamento:', e);
  prisma.$disconnect(); // Chiudi la connessione anche in caso di errore
  process.exit(1); // Esci dal processo con un codice di errore
});
