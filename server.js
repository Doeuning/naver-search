const morgan = require("morgan");
const express = require("express");
const app = express();
const url = require("url");
const uuidAPIkey = require("uuid-apikey");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
  try {
    return await axios.get(
      "https://roadbook.co.kr/category/%EC%8B%A0%EA%B0%84%EC%86%8C%EA%B0%9C"
    );
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then((html) => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div#searchList ol").children("li");

    $bodyList.each(function (i, elm) {
      ulList[i] = {
        bookList: $(this).find("a").text(),
        url: $(this).find("a").attr("href"),
      };
    });

    const data = ulList.filter((n) => n.bookList);
    return data;
  })
  .then((res) => console.log(res));

app.set("port", 4000);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    withCredentials: true,
  })
);

// app.use(express.static(path.join(__dirname, "public")));

let boardList = [
  {
    id: 1,
    user_id: "김도은",
    age: 33,
    title: "개발자 여자 실제 인간",
  },
  {
    id: 2,
    user_id: "리히트",
    age: 26,
    title: "북부대공 투디인간 남자",
  },
  {
    id: 3,
    user_id: "남도윤",
    age: 28,
    title: "연예인 투디인간 남자",
  },
];
let numOfBoard = 3;

const key = {
  apiKey: "WXMWV96-1AT4H6B-HAJD7NT-X57FPZW",
  uuid: "e769cda4-0ab4-4899-8aa4-d3d7e94efb7f",
};

// 라우팅 설정
app.get("/", (req, res) => {
  res.send("this is api.js");
});
// 게시글 api
app.get("/board/:apikey/:type", (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "localhost:3000");
  // res.setHeader("Access-Control-Allow-Credentials", true);
  let { type, apikey } = req.params;
  const queryData = url.parse(req.url, true).query;

  if (uuidAPIkey.isAPIKey(apikey) && uuidAPIkey.check(apikey, key.uuid)) {
    if (type === "search") {
      const keyword = queryData.keyword;
      const result = boardList.filter((e) => {
        return e.title.includes(keyword);
      });
      res.send(result);
    } else if (type === "user") {
      const user_id = queryData.user_id;
      const result = boardList.filter((e) => {
        return e.user_id === user_id;
      });
      res.send(result);
    } else {
      res.send("Wrong API Key");
    }
  }
});
app.get("/board", (req, res) => {
  res.send(boardList);
});
app.post("/board", (req, res) => {
  const board = {
    id: ++numOfBoard,
    user_name: req.body.user_name,
    age: req.body.age,
    position: req.body.position,
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
    user_name: req.params.user_name,
    age: req.body.age,
    position: req.body.position,
  };
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
