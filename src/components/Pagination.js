import React, { useContext } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";

const Pagination = () => {
  let { page, setPage, totalPage } = useContext(CryptoContext);
  const totalNumber = Math.ceil(totalPage / 10);
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
  return (
    <div className="flex items-center">
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
            <img src={paginationArrow} alt="right" className="w-full h-auto" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
