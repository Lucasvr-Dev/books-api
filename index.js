const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Lê o banco do arquivo
function lerBanco() {
  if (!fs.existsSync(DB_PATH)) {
    const inicial = {
      livros: [
        { id: uuidv4(), titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954 },
        { id: uuidv4(), titulo: 'Dom Casmurro', autor: 'Machado de Assis', ano: 1899 },
      ]
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(inicial, null, 2));
    return inicial;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

// Salva no arquivo
function salvarBanco(dados) {
  fs.writeFileSync(DB_PATH, JSON.stringify(dados, null, 2));
}

// GET /livros
app.get('/livros', (req, res) => {
  const { livros } = lerBanco();
  res.json(livros);
});

// GET /livros/:id
app.get('/livros/:id', (req, res) => {
  const { livros } = lerBanco();
  const livro = livros.find(l => l.id === req.params.id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
  res.json(livro);
});

// POST /livros
app.post('/livros', (req, res) => {
  const { titulo, autor, ano } = req.body;
  if (!titulo || !autor || !ano) {
    return res.status(400).json({ erro: 'Título, autor e ano são obrigatórios' });
  }

  const banco = lerBanco();
  const novoLivro = { id: uuidv4(), titulo, autor, ano: Number(ano) };
  banco.livros.push(novoLivro);
  salvarBanco(banco);
  res.status(201).json(novoLivro);
});

// PUT /livros/:id
app.put('/livros/:id', (req, res) => {
  const banco = lerBanco();
  const index = banco.livros.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ erro: 'Livro não encontrado' });

  const { titulo, autor, ano } = req.body;
  banco.livros[index] = { ...banco.livros[index], titulo, autor, ano: Number(ano) };
  salvarBanco(banco);
  res.json(banco.livros[index]);
});

// DELETE /livros/:id
app.delete('/livros/:id', (req, res) => {
  const banco = lerBanco();
  const index = banco.livros.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ erro: 'Livro não encontrado' });

  banco.livros.splice(index, 1);
  salvarBanco(banco);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Banco de dados: ${DB_PATH}`);
});