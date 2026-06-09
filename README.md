# 📚 Books API

API REST para gerenciamento de livros, construída com Node.js e Express. Utiliza um arquivo JSON local como banco de dados, dispensando qualquer configuração de banco de dados externo.

## 🛠️ Tecnologias

- **Node.js**
- **Express 5**
- **UUID** — geração de IDs únicos
- **CORS** — habilitação de requisições cross-origin
- **fs** (nativo) — persistência em arquivo JSON

## 📁 Estrutura do projeto

```
books-api/
├── index.js         # Ponto de entrada e definição das rotas
├── database.json    # Banco de dados gerado automaticamente na primeira execução
├── package.json
└── README.md
```

## 🚀 Como rodar

### Pré-requisitos

- Node.js >= 18

### Instalação e execução

```bash
npm install
node index.js
```

A API estará disponível em `http://localhost:3000`.

> O arquivo `database.json` é criado automaticamente na primeira execução, já com dois livros de exemplo.

## 📡 Endpoints

| Método   | Rota          | Descrição              |
|----------|---------------|------------------------|
| `GET`    | `/livros`     | Listar todos os livros |
| `GET`    | `/livros/:id` | Buscar livro por ID    |
| `POST`   | `/livros`     | Criar novo livro       |
| `PUT`    | `/livros/:id` | Atualizar livro        |
| `DELETE` | `/livros/:id` | Deletar livro          |

## 📝 Exemplos de uso

### Criar um livro — `POST /livros`

**Body (JSON):**
```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "ano": 2008
}
```

**Resposta `201`:**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "ano": 2008
}
```

### Listar todos — `GET /livros`

**Resposta `200`:**
```json
[
  {
    "id": "...",
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien",
    "ano": 1954
  }
]
```

### Atualizar — `PUT /livros/:id`

**Body (JSON):**
```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "ano": 2009
}
```

### Deletar — `DELETE /livros/:id`

Retorna `204 No Content` em caso de sucesso.

## ⚠️ Validações

- Os campos `titulo`, `autor` e `ano` são obrigatórios no `POST`.
- Retorna `400` se algum campo estiver ausente.
- Retorna `404` se o livro não for encontrado.
