import { createContext, useLayoutEffect, useState } from "react";

//Create context Object
export const TrendingContext = createContext({});

//Create provider component
export const TrendingProvider = ({ children }) => {
  const [trendData, setTrendData] = useState();
  const getTrendData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      );
      const data = await response.json();
      console.log(data);
      setTrendData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };
  const resetTrendingResult = () => {
    getTrendData();
  };
  useLayoutEffect(() => {
    getTrendData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TrendingContext.Provider
      value={{
        trendData,
        resetTrendingResult,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
