import request from "supertest";
import app from "../app.js"; // Arquivo que configura o servidor

test("POST /login - Login certo", () => {
  return request(app)
    .post("/login")
    .send({ usuario: "admin", senha: "123" })
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });
});

test("POST /login - Login inválido retorna erro", () => {
  return request(app)
    .post("/login")
    .send({ usuario: "admin", senha: "senhaerrada" })
    .then((response) => {
      expect(response.status).toBe(401);
    });
});


test("GET /users -   lista de usuários", () => {
  return request(app)
    .get("/users")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
});


test("POST /users - Criar usuario", () => {
  return request(app)
    .post("/users")
    .send({ nome: "Jhona", email: "xxxx@example.com" })
    .then((response) => {
      expect(response.status).toBe(201);
      expect(response.body.nome).toBe("Jhona");
    });
});


test("DELETE /users/:id - Remover usuário ", () => {
  return request(app)
    .delete("/users/1")
    .then((response) => {
      expect(response.status).toBe(204);
    });
});
