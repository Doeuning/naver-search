const morgan = require("morgan");
const express = require("express");
const app = express();

const path = require("path");

app.set("port", 4000);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "public")));

let boardList = [];
let numOfBoard = 0;

// 라우팅 설정
app.get("/", (req, res) => {
  res.send("this is api.js");
});
// 게시글 api
app.get("/board", (req, res) => {
  res.send(boardList);
});
app.post("/board", (req, res) => {
  const board = {
    id: ++numOfBoard,
    user_id: req.body.user_id,
    date: new Date(),
    title: req.body.title,
    content: req.body.content,
  };
  boardList.push(board);

  res.redirect("/board");
});
app.put("/board/:id", (req, res) => {
  const findItem = boardList.find((item) => {
    return item.id == +req.params.id;
  });
  const idx = boardList.indexOf(findItem);
  boardList.splice(idx, 1);

  const board = {
    id: +req.params.id,
    user_id: req.params.user_id,
    date: new Date(),
    title: req.body.title,
    content: req.body.content,
  };
  v;
  boardList.push(board);
  res.redirect("/board");
});
app.delete("/board/:id", (req, res) => {
  const findItem = boardList.find((item) => {
    return item.id == +req.params.id;
  });
  const idx = boardList.indexOf(findItem);
  boardList.splice(idx, 1);

  res.redirect("/board");
});

// app.get("/:type", (req, res) => {
//   let { type } = req.params;
//   res.send(type);
// });
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.listen(app.get("port"), () => {
  console.log(app.get("port") + "포트에서 서버 실행중");
});
