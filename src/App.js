import "./App.css";
import Search from "./components/Search";
import ResultList from "./components/ResultList";
import { useState, useEffect } from "react";
// import { getSearch } from "./api/search";
import axios from "axios";
// axios.defaults.withCredentials = true;

function App() {
  let [keyword, setKeyword] = useState("");
  let [datas, setDatas] = useState([]);
  const handleSearch = (key) => {
    setKeyword(key);
  };

  useEffect(() => {
    fetchData();
  }, [keyword]);

  const fetchData = async () => {
    const display = 20;
    const url = `/api/v1/search/blog.json`;
    await axios
      .get(url, {
        params: {
          query: keyword,
          display: display,
        },
        headers: {
          "X-Naver-Client-Id": "FSyHYM0S3JX6DSx13tCi",
          "X-Naver-Client-Secret": "Tf8NaTcLxU",
        },
      })
      .then((response) => {
        setDatas(response.data.items);
      });
  };

  return (
    <div id="app">
      <h1>hihi</h1>
      <Search keyword={handleSearch} />
      <ResultList list={datas} />
      {/* <div className="list-wrapper">
        <ul>
          {datas.map((el) => {
            <li key={el.link}>
              <h3>el.title</h3>
              <a href={el.link}></a>
            </li>;
          })}
        </ul>
      </div> */}
    </div>
  );
}

export default App;
