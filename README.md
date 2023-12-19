# PDV - Fast Food API

Este projeto consiste em desenvolver um Point of Sale (PDV) API para um restaurante de fast food, proporcionando um ambiente intuitivo para registrar vendas de forma fácil e rápida. O restaurante trabalha com preparo de comidas rápidas, e o método atual por comanda está tornando o processo mais lento. O objetivo é criar uma solução que liste os produtos mais vendidos, facilite a inserção no checkout e proporcione uma experiência visual simples e moderna.

## Deploy 🌐

URL da API: `https://fast-restaurant-api.onrender.com`

## Documentação 📚

URL da Documentação: `https://app.swaggerhub.com/apis-docs/PDROCHA03/Fast-Food-Api/1.0.0`;

## Instalação e Execução 🚀

Para rodar o Projeto localmente, siga os seguinter passos:

1. Clone o repositório: `git clone https://github.com/pablodru/fast-restaurant-api`;
2. Acesse o diretório do projeto: `cd fast-restaurant-api`;
3. Instale as dependências: `npm install` ou `npm i`;
4. Certifique-se de ter um .env.development de acordo com o .env.example e o PostgreSQL instalado;
5. Rode as migrações: `npm run dev:migration:run`;
6. Rode o projeto: `npm run dev`;
7. Acesse no local host pela URL na porta 5000: `http://localhost:5000`

## Tecnologias 🔧

Para a construção do projeto foi utilizado as seguintes tecnologias:

- TypeScript: v5.3.3;
- Node: v16.20.0;
- Express: v4.18.2;
- Prisma: v5.7.0;
- PostgreSQL;
- Jest: v29.7.0;
- Supertest: v6.3.3;
- Git;
- Joi: v17.11.0;
- Xss: v1.0.14
- Nodemon: v3.0.2.
- ESLint
