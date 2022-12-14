import React, { useContext, useRef } from "react";
import Search from "./Search";
import submitIcon from "../assets/submit-icon.svg";
import selectIcon from "../assets/select-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

const Filter = () => {
  let { setCurrency, setSortBy, resetFunc } = useContext(CryptoContext);
  const currencyRef = useRef(null);
  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };
  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };
  return (
    <div className="w-full lg:h-12 h-full lg:border-2 lg:border-gray-100 rounded-lg lg:flex items-center justify-between relative">
      <Search></Search>
      <div className="flex lg:mr-7 justify-between sm:flex-row flex-col relative">
        <form
          className="relative flex items-center font-nunito lg:mr-12"
          autoComplete="false"
          onSubmit={handleCurrencySubmit}
        >
          <label
            htmlFor="currency"
            className="relative flex first-letter:items-center mr-2 font-bold "
          >
            currency
          </label>
          <input
            ref={currencyRef}
            type="text"
            name="currency"
            placeholder="usd"
            className="w-16 bg-gray-200 rounded placeholder:text-gray-100 pl-2 required outline-none border border-transparent focus:border-cyan leading-4"
          />
          <button type="submit" className="ml-1 cursor-pointer">
            <img src={submitIcon} alt="Submit" className="w-full h-auto" />
          </button>
        </form>
        <label className="relative flex items-center sm:justify-center justify-start mt-4 sm:mt-0 ">
          <span className="font-bold mr-2 flex-shrink-0">sort by:</span>
          <select
            name="sortby"
            className="rounded w-full bg-gray-200 text-base pl-2 pr-10 py-0.5 leading-4 capitalize outline-none cursor-pointer"
            onClick={handleSort}
          >
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
            <option value="gecko_desc">gecko desc</option>
            <option value="gecko_asc">gecko asc</option>
          </select>
          <img
            src={selectIcon}
            alt="select"
            className="w-[1rem] h-auto absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </label>
        <button
          className="w-[2rem] ml-4 hover:scale-110 transition-all transition-ease sm:relative absolute right-0 top-0"
          onClick={resetFunc}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="1.5em"
            height="1.5em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            style={{
              msTransform: "rotate(360deg)",
              WebkitTransform: "rotate(360deg)",
              transform: "rotate(360deg)",
            }}
            className="fill-cyan w-full h-full"
          >
            <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3s-3 1.331-3 3s1.329 3 3 3z" />
            <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219a9.053 9.053 0 0 0-2.43-2.43a8.95 8.95 0 0 0-3.219-1.355a9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053a7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725a7.11 7.11 0 0 1-.644 1.188a7.2 7.2 0 0 1-.858 1.039a7.028 7.028 0 0 1-3.536 1.907a7.13 7.13 0 0 1-2.822 0a6.961 6.961 0 0 1-2.503-1.054a7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034a9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183a9.014 9.014 0 0 0 3.218-1.355a8.886 8.886 0 0 0 1.331-1.099a9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" />
            <rect x={0} y={0} width={24} height={24} fill="rgba(0, 0, 0, 0)" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Filter;
