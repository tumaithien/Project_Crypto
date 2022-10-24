import React, { useContext, useRef } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0 && val > 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };
  return (
    <form
      className="relative flex items-center font-nunito mr-12 sm:mb-0 mb-4 sm:mt-0 mt-4"
      autoComplete="false"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="perpage"
        className="relative flex justify-center items-center mr-2 font-bold"
      >
        Per Page
      </label>
      <input
        ref={inputRef}
        type="number"
        name="perpage"
        min={1}
        max={250}
        placeholder="10"
        className="w-16 bg-gray-200 rounded placeholder:text-gray-100 pl-2 required outline-none border border-transparent focus:border-cyan leading-4"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="Submit" className="w-full h-auto" />
      </button>
    </form>
  );
};

const Pagination = () => {
  let { page, setPage, totalPage, perPage, cryptoData } =
    useContext(CryptoContext);
  const totalNumber = Math.ceil(totalPage / perPage);

  const next = () => {
    if (page === totalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };
  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };
  const multiNext = () => {
    if (page + 3 >= totalNumber) {
      setPage(totalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };
  const multiPrev = () => {
    if (page - 3 <= 1) {
      setPage(totalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };
  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex items-center sm:flex-row flex-col sm:w-auto w-full">
        <PerPage />
        <ul className="flex items-center justify-center text-sm">
          <li className="flex items-center">
            <button className="outline-none hover:text-cyan w-8" onClick={prev}>
              <img
                src={paginationArrow}
                alt="left"
                className="w-full h-auto rotate-180"
              />
            </button>
          </li>
          {page + 1 === totalNumber || page === totalNumber ? (
            <li>
              <button
                onClick={multiPrev}
                className="outline-none hover:text-cyan flex items-center justify-center text-lg w-8 h-8 rounded-full"
              >
                ...
              </button>
            </li>
          ) : null}
          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={prev}
                className="outline-none hover:text-cyan flex items-center justify-center  w-8 h-8 rounded-full bg-gray-200 mx-1.5"
              >
                {page - 1}
              </button>
            </li>
          ) : null}
          <li>
            <button className="outline-none flex items-center justify-center  w-8 h-8 rounded-full bg-cyan text-gray-200 mx-1.5">
              {page}
            </button>
          </li>
          {page + 1 !== totalNumber && page !== totalNumber ? (
            <li>
              <button
                onClick={next}
                className="outline-none hover:text-cyan flex items-center justify-center  w-8 h-8 rounded-full bg-gray-200 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          ) : null}
          {page + 1 !== totalNumber && page !== totalNumber ? (
            <li>
              <button
                onClick={multiNext}
                className="outline-none hover:text-cyan flex items-center justify-center  w-8 h-8 rounded-full text-lg"
              >
                ...
              </button>
            </li>
          ) : null}
          {page !== totalNumber ? (
            <li>
              <button
                onClick={() => setPage(totalNumber)}
                className="outline-none hover:text-cyan flex items-center justify-center  w-8 h-8 rounded-full bg-gray-200 mx-1.5"
              >
                {totalNumber}
              </button>
            </li>
          ) : null}
          <li className="flex items-center">
            <button className="outline-none hover:text-cyan w-8" onClick={next}>
              <img
                src={paginationArrow}
                alt="right"
                className="w-full h-auto"
              />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
