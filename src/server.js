import "dotenv/config"
import express, { request, response } from "express"

import conn from "./config/conn.js"

//importação dos módulos e criação de tabela
import "./models/livroModel.js"
import "./models/funcionarioModel.js"
import "./models/clienteModel.js"

//importação de rotas
import livroRouts from "./routes/livroRouter.js"
import funcionarioRouts from "./routes/funcionarioRouter.js"
import clienteRouts from "./routes/clienteRouter.js"

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//utilização das rotas 
//http://localhost:3333/livros
app.use("/livros", livroRouts);
app.use("/funcionarios", funcionarioRouts);
app.use("/clientes", clienteRouts);

app.get("/", (request, response) => {
    response.send("Olá, Mundo!");
});

app.listen(PORT, () => {
    console.log("Servidor on port " + PORT); 
});







