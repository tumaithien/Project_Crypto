import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import TrendingItem from "../components/TrendingItem";
import { TrendingContext } from "../context/TrendingContext";

const Trending = () => {
  const { trendData, resetTrendingResult } = useContext(TrendingContext);
  return (
    <section className="lg:w-[80%] w-[90%] h-full flex flex-col mt-16 mb-24 relative">
      <button
        className="w-[4rem] ml-4 hover:scale-110 absolute right-1 -top-3 transition-all transition-ease"
        onClick={resetTrendingResult}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="2em"
          height="2em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          style={{
            msTransform: "rotate(360deg)",
            WebkitTransform: "rotate(360deg)",
            transform: "rotate(360deg)",
          }}
          className="fill-cyan"
        >
          <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3s-3 1.331-3 3s1.329 3 3 3z" />
          <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219a9.053 9.053 0 0 0-2.43-2.43a8.95 8.95 0 0 0-3.219-1.355a9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053a7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725a7.11 7.11 0 0 1-.644 1.188a7.2 7.2 0 0 1-.858 1.039a7.028 7.028 0 0 1-3.536 1.907a7.13 7.13 0 0 1-2.822 0a6.961 6.961 0 0 1-2.503-1.054a7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034a9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183a9.014 9.014 0 0 0 3.218-1.355a8.886 8.886 0 0 0 1.331-1.099a9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" />
          <rect x={0} y={0} width={24} height={24} fill="rgba(0, 0, 0, 0)" />
        </svg>
      </button>
      <div className="flex flex-wrap lg:flex-row flex-col min-h-[60vh] py-8 lg:justify-evenly justify-center items-center mt-9 border border-gray-100 rounded">
        {trendData ? (
          trendData.map((coin) => (
            <TrendingItem key={coin.item.id} data={coin.item} />
          ))
        ) : (
          <div className="w-full min-h-[60vh] flex justify-center items-center">
            <div
              className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
              role="status"
            ></div>
            <span className="ml-2">Please wait...</span>
          </div>
        )}
      </div>

      <Outlet />
    </section>
  );
};

export default Trending;
