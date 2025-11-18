import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/megasena.ts";

import { corsOptions } from "./config/corsConfig.ts";
//import { corsOptions } from "./config/corsConfig2.ts";

dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Todas as rotas da Mega-Sena começam com /api/megasena
app.use("/api/megasena", router);

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
