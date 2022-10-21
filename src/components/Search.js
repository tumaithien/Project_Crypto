import { data } from "autoprefixer";
import debounce from "lodash.debounce";
import React, { useContext, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);
  let handleChangeInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };
  const selectCoin = (coinId) => {
    setCoinSearch(coinId);
    setSearchText("");
    setSearchData();
  };
  return (
    <>
      <form
        className="w-96 relative flex items-center ml-7 font-nunito"
        onSubmit={handleSubmit}
        autoComplete="false"
      >
        <input
          onChange={handleChangeInput}
          value={searchText}
          type="text"
          name="search"
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 outline-0 border-transparent border focus:border-cyan"
          placeholder="Search here..."
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={searchIcon} alt="Search" className="w-full h-auto" />
        </button>
      </form>
      {searchText.length > 0 ? (
        <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 opacity-80 backdrop-blur-md">
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                  className="flex items-center ml-4 my-2 cursor-pointer"
                >
                  <img
                    className="w-[1rem] h-[1rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />
                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div
                className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
                role="status"
              ></div>
              <span className="ml-2">Please wait...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};
const Search = () => {
  let { getSearchResult } = useContext(CryptoContext);
  const debounceFn = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFn}></SearchInput>
    </div>
  );
};

export default Search;
