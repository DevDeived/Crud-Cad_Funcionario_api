// api/db.js  ← versão corrigida (named export)
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// mantém o nome "db" que seus controllers já conhecem
export { db };

// teste de conexão (opcional)
db.connect()
  .then(() => console.log("PostgreSQL conectado com sucesso!"))
  .catch((err) => console.error("Erro na conexão:", err.message));