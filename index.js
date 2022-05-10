const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:abcd1234@sims-shop.2epri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      // (node:12532) err 지우기위함
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Helloasdasd"));

// 회원가입 라우터 start==============================================================
app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
// 회원가입 라우터 end==============================================================

app.listen(port, () => console.log(`${port}로 연결중...`));
