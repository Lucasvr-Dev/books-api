# 📚 Books API

API REST para gerenciamento de livros.

## Tecnologias
- Node.js
- Express
- UUID

## Como rodar

```bash
npm install
node index.js
```

A API estará disponível em `http://localhost:3000`

## Endpoints

| Método | Rota         | Descrição         |
|--------|--------------|-------------------|
| GET    | /livros      | Listar todos      |
| GET    | /livros/:id  | Buscar por ID     |
| POST   | /livros      | Criar livro       |
| PUT    | /livros/:id  | Atualizar livro   |
| DELETE | /livros/:id  | Deletar livro     |

## Exemplo de body (POST/PUT)

```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "ano": 2008
}
```
