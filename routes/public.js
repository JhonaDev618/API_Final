import express from "express";
import usuariosControler from "../controllers/usuariosControler.js";
import jwt from "jsonwebtoken";
import verifyJwt from "../middleware/auth.js";
import "dotenv/config";

// Importando apenas o router do express
const router = express.Router();

const SECRET = process.env.SECRET;

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um usuário e retorna o token JWT.
 *     description: Autentica o usuário e gera um token JWT para futuras requisições.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: integer
 *             required:
 *               - usuario
 *               - senha
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *       401:
 *         description: Usuário ou senha inválidos.
 */
router.post("/login", (req, res) => {
  const usuario = req.body.usuario;
  const senha = parseInt(req.body.senha);

  // Não está buscando no banco de dados, definido um login e senha fixo para teste
  try {
    if (usuario === "admin" && senha === 123) {
      // id foi definido pois não está buscando no banco de dados
      const token = jwt.sign({ id: 1 }, SECRET, { expiresIn: "1h" });
      return res.status(200).json({ auth: true, token: token });
    }
    return res
      .status(401)
      .json({ Menssage: "Login ou senha inválidos".usuario, senha });
  } catch (err) {
    return res
      .status(401)
      .json({ Menssage: "Erro ao realizar login no sistema" });
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários.
 *     description: Recupera a lista de usuários cadastrados.
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/users", verifyJwt, (req, res) => {
  res.status(200).json(usuariosControler.listarUsuarios());
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID.
 *     description: Busca um usuário com base no ID informado.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: ID inválido.
 */
router.get("/users/:id", verifyJwt, (req, res) => {
  const id = parseInt(req.params.id);
  const retorno = usuariosControler.buscarUsuarioID(id);
  if (retorno == 0) {
    return res.status(400).json({ error: "ID inválido." });
  }
  res.status(200).json(retorno);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário.
 *     description: Cadastra um novo usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - nome
 *               - email
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Nome e email são obrigatórios.
 */
router.post("/users", verifyJwt, (req, res) => {
  const novoUsuario = req.body; //recebendo os dados do usuario enviados no POST para a api
  if (!novoUsuario.nome || !novoUsuario.email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }
  usuariosControler.adicionarUsuario(novoUsuario);
  res.status(201).json(novoUsuario);
});

/**
 * Definições adicionais da documentação Swagger usando anotações.
 *
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário pelo ID.
 *     description: Atualiza as informações de um usuário específico, identificando-o pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário a ser atualizado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - nome
 *               - email
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: ID inválido ou dados inválidos.
 */
router.put("/users/:id", verifyJwt, (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioAtualizado = req.body;
  const a = usuariosControler.atualizarUsuario({
    ...usuarioAtualizado,
    id: id,
  });
  res.status(200).json(a);
});

/* /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID.
 *     description: Exclui um usuário específico, identificado pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário a ser excluído
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso, sem conteúdo na resposta.
 *       400:
 *         description: ID inválido.
 */
router.delete("/users/:id", verifyJwt, (req, res) => {
  const id = req.params.id;
  usuariosControler.removerUsuarioID(id);
  res.status(204).send();
  console.log(usuariosControler.removerUsuarioID(id));
});

// Exportando o router para poder usar em outros lugares
export default router; // para poder pegar as todas as rotas no arquivo app.js
