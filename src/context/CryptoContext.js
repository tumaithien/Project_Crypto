import { createContext, useLayoutEffect, useState } from "react";

//Create context Object
export const CryptoContext = createContext({});

//Create provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(250);
  const getCryptoData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/list`
      );
      const data = await response.json();
      setTotalPage(data.length);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=10&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      );
      const data = await response.json();
      console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSearchResult = async (query) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const data = await response.json();
      console.log(data);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };
  const resetFunc = () => {
    setPage(1);
    setCoinSearch("");
  };
  useLayoutEffect(() => {
    getCryptoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinSearch, currency, sortBy, page]);
  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPage,
        resetFunc,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
