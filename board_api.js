const morgan = require("morgan");
const express = require("express");
const axios = require("axios");
const app = express();

app.set("port", 3000);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/board_api.html");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port") + "포트에서 서버 실행중");
});
