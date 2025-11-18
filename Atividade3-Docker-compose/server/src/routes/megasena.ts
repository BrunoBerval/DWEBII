//src/routes/megasena.ts
import { Router } from "express";
import { pool } from "../config/db.ts"; 


const router = Router();

// Rota: concurso mais recente
router.get("/latest", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar último concurso" });
  }
});

// Rota: buscar concurso pelo número
router.get("/:concurso", async (req, res) => {
  try {
    const { concurso } = req.params;
    const result = await pool.query(
      "SELECT * FROM megasena WHERE concurso = $1",
      [concurso]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: "Concurso não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao buscar concurso" });
  }
});

export default router;
