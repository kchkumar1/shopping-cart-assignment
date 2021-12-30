const express = require("express");
const path = require("path");
const cors = require("cors");
const bannersData = require("./server/banners/index.get.json");
const categoriesData = require("./server/categories/index.get.json");
const productsData = require("./server/products/index.get.json");

let app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: (path.join(__dirname, "client/html")) });
});

app.get("/banners", (req, res) => {
  res.json(bannersData);
});

app.get("/categories", (req, res) => {
  res.json(categoriesData);
});

app.get("/products", (req, res) => {
  res.json(productsData);
});

app.listen(5000, () => console.log("Server running at 5000 !"));
