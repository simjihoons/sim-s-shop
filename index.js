const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");

const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    // (node:12532) err 지우기위함
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Helloasdasd!!!!!!!!@@@@!"));

// 회원가입 라우터 start==============================================================
app.post("/register", (req, res) => {
  const user = new User(req.body);

  //password 암호화
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
// 회원가입 라우터 end==============================================================

app.listen(port, () => console.log(`${port}로 연결중...`));
