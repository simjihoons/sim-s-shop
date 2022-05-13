const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");
const req = require("express/lib/request");
mongoose
  .connect(config.mongoURI, {
    // (node:12532) 등 err 지우기위함
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("여기여기!!!"));

// 회원가입 라우터 start==============================================================
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  //password 암호화
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
// 회원가입 라우터 end==============================================================

// 로그인 라우터 start==============================================================
app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      //유저가 없을때
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.!",
        });

      //비밀번호가 맞으면 토큰을 생성하기
      //User.js에(유저모델) 따로 메소드 만들기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰 저장(쿠키)
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
// 로그인 라우터 end================================================================

// auth 라우터 start================================================================
//auth 미들웨어 추가
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
  });
});

// auth 라우터 end================================================================

// 로그아웃 라우터 start==============================================================
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});
// 로그아웃 라우터 end================================================================

app.listen(port, () => console.log(`${port}로 연결중...`));
