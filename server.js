const express = require("express");
const path = require("path");
const apiRouter = require("./api/api"); // Caminho corrigido
const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(apiRouter);

app.listen(3000, () => {
    console.log("Servidor iniciado");
});
