const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리

  //쿠키에서 토큰 가져옴
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    //유저가 없을 때
    if (!user) return res.json({ isAuth: false, error: true });

    //유저가 있을 때
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
