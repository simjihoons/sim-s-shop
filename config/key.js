//로컬 , 배포인지
//배포일때
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  //로컬일때
  module.exports = require("./dev");
}
