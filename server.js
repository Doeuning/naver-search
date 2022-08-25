// 1. express 호출
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

// 2. 포트 설정
app.set("port", 4000);

// 3. 공통 사용 미들웨어 장착
app.use(cors());
app.use((req, res) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Origin": "http://localhost:4000",
    "Access-Control-Allow-Headers":
      "Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization",
  }); // 모든 도메인 허용
});

// 7. 생성된 서버가 포트를 리스닝
app.listen(app.get("port"), () => {
  console.log(app.get("port") + "포트에서 서버 실행중");
}); // 포트 연결, 서버 실행

app.use(express.static(path.join(__dirname, "react-test/build")));

// 4. 라우터 구성
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "react-test/build/index.html"));
});
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "react-test/build/index.html"));
});
