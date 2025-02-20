const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.json()); // Para processar o corpo das requisições em JSON
app.use(cors()); // Permite requisições do front-end

// Rota para buscar todas as tarefas
app.get("/todos", (req, res) => {
    db.all("SELECT * FROM todos", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para adicionar uma nova tarefa
app.post("/todos", (req, res) => {
    const { text, completed } = req.body;
    const stmt = db.prepare("INSERT INTO todos (text, completed) VALUES (?, ?)");
    stmt.run(text, completed, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, text, completed });
    });
    stmt.finalize();
});

// Rota para atualizar o status de uma tarefa
app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const stmt = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
    stmt.run(completed, id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id, completed });
    });
    stmt.finalize();
});

// Rota para remover uma tarefa
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM todos WHERE id = ?");
    stmt.run(id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(204).end();
    });
    stmt.finalize();
});

// Iniciar o servidor na porta 5000
app.listen(5000, () => {
    console.log("API rodando na porta 5000.");
});
