import React from "react";

const ResultList = (props) => {
  console.log("props.list", props.list);
  return props.list.length ? (
    <div className="list-wrap">
      <ul>
        {props.list.map((el) => {
          return (
            <li key={el.link}>
              <a href={el.link}>
                <h3>{el.title}</h3>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <h1>데이터가 없습니다</h1>
  );
};

export default ResultList;
