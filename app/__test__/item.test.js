const request = require('supertest');
const express = require('express');

require("dotenv").config({ path: ".env" });

let routes = require("../routes/index");

let app = express();
let port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

jest.setTimeout(10000); // 30 segundos


describe('Testando rotas de Itens', () => {
  // Teste para a rota GET /itens
  it("GET /itens - Deve retornar 200 e a lista de itens", async () => {
    const response = await request(app).get("/itens");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("itens"); // Verifica se há uma propriedade "itens"
  });

  // Teste para a rota GET /itens/:id
  it("GET /itens/:id - Deve retornar 200 e o item correspondente", async () => {
    const response = await request(app).get("/itens/1"); // Substitua 1 pelo ID esperado para teste
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("item"); // Verifica se há uma propriedade "item"
  });

  // Teste para a rota PUT /itens
  it("PUT /itens - Deve atualizar um item existente e retornar 200", async () => {
    const updatedItem = {
      nome: "Item Teste",
      categoria: "Categoria Teste",
      preco_loca: 100.0,
      idGrupo: 2,
    };

    const response = await request(app)
      .put(`/itens/${updatedItem.nome}/${updatedItem.categoria}/${updatedItem.preco_loca}/${updatedItem.idGrupo}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result"); // Verifica se o resultado foi retornado
  });
});
