const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Création des proxys pour chaque microservice
const usersServiceProxy = createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,
});
const examsServiceProxy = createProxyMiddleware({
  target: "http://localhost:3004",
  changeOrigin: true,
});
const questionsServiceProxy = createProxyMiddleware({
  target: "http://localhost:3000",
  changeOrigin: true,
});
const responsesServiceProxy = createProxyMiddleware({
  target: "http://localhost:3002",
  changeOrigin: true,
});
const resultatsServiceProxy = createProxyMiddleware({
  target: "http://localhost:3003",
  changeOrigin: true,
});
const departementServiceProxy = createProxyMiddleware({
  target: "http://localhost:3006",
  changeOrigin: true,
});
const classeServiceProxy = createProxyMiddleware({
  target: "http://localhost:3007",
  changeOrigin: true,
});

// Utilisation des proxys pour rediriger les requêtes vers les microservices correspondants
app.use("/api/users", usersServiceProxy);
app.use("/api/examen", examsServiceProxy);
app.use("/api/questions", questionsServiceProxy);
app.use("/api/responses", responsesServiceProxy);
app.use("/calculate-result", resultatsServiceProxy);
app.use("/api/departement", departementServiceProxy);
app.use("/api/classe", classeServiceProxy);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
