import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingItem = ({ data }) => {
  let navigate = useNavigate();
  const getCoinDetails = (id) => {
    navigate(`${id}`);
  };
  return (
    <div
      className="lg:w-[40%] sm:w-[70%] w-[80%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40"
      onClick={() => getCoinDetails(data.id)}
    >
      {data ? (
        <>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize inline-block mr-2">
              name:{" "}
            </span>
            <span className="text-cyan">{data.name}</span>
            <img
              className="w-[1.5rem] h-[1.5rem] rounded-full ml-2"
              src={data.small}
              alt={data.name}
            />
          </h3>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize inline-block mr-2">
              market cap rank:
            </span>
            <span className="text-cyan">{data.market_cap_rank}</span>
          </h3>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize inline-block mr-2">
              prices (in btc):
            </span>
            <span className="text-cyan">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5,
              }).format(data.price_btc)}
            </span>
          </h3>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-gray-100 capitalize inline-block mr-2">
              score:
            </span>
            <span className="text-cyan">{data.score}</span>
          </h3>
          <img
            className="lg:w-[35%] w-[5rem] rounded-full absolute lg:top-2/4 lg:-translate-y-2/4 lg:-right-12 -right-6 sm:block hidden -top-6"
            src={data.large}
            alt={data.name}
          />
        </>
      ) : null}
    </div>
  );
};

export default TrendingItem;
