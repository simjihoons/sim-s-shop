const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:abcd1234@sims-shop.2epri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      // (node:12532) err 지우기위함
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Helloasdasd"));

app.listen(port, () => console.log(`${port}로 연결중...`));
