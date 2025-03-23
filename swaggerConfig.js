// swaggerConfig.js

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const app = express();

export default function swaggerDocs(app) {
  // Definição das opções do Swagger
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de Exemplo",
        version: "1.0.0",
        description: "Documentação da API usando Swagger",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"], // Arquivo que contém as rotas e comentários do Swagger
  };

  // Gerar a documentação Swagger
  const swaggerSpec = swaggerJSDoc(options);

  // Rota para acessar a documentação Swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
