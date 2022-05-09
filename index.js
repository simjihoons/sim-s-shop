//백엔드의 시작점
const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => res.send("hello world!!!"));

app.listen(port, () => console.log(`${port}로 시작...`));
