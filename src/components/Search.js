import React from "react";

const Search = (props) => {
  const inputRef = React.createRef();
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      searchInput();
    }
  };
  const searchInput = () => {
    console.log("자식", inputRef.current.value);
    props.keyword(inputRef.current.value);
  };
  return (
    <div className="search-area">
      <input type="text" ref={inputRef} onKeyDown={pressEnter} />
      <button onClick={searchInput}>검색</button>
    </div>
  );
};

export default Search;
