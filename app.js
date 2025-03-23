import express from "express";
import publicRoutes from "./routes/public.js";
import "dotenv/config"; // Importa as variáveis de ambiente no .env variable
import swaggerDocs from "./swaggerConfig.js";

const app = express();
const port = process.env.PORT; // Define a porta do servidor
app.use(express.json()); // define que o express vai utilizar json

// Rotas públicas do arquivo routes.
app.use("/", publicRoutes);

// Configurar o Swagger
swaggerDocs(app);

/*
Agora vamos evoluir a API criada na atividade anterior:
Autenticação JWT:Criar um endpoint POST /login que gere um token JWT ao receber um usuário e senha. OK
Proteger a rota GET /users para que apenas usuários autenticados possam acessar. OK
Enviem o código e um vídeo testando no postman - *Envio com link do Github
*/

app.listen(port, () =>
  console.log(`Servidor rodando na porta http:\\localhost:${port} 🚀`)
);

export default app;
