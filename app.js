const express = require("express");
const app = express();
const port = 3050;

const fs = require("fs");

app.get("/", (req, res) => {
  console.log("Hej hej");
});

app.listen(port, () => console.log("Server is up"));
