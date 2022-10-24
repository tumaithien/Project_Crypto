import { createContext, useLayoutEffect, useState } from "react";

//Create context Object
export const CryptoContext = createContext({});

//Create provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(250);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState({ data: "", coinData: "", search: "" });
  const getCryptoData = async () => {
    setCryptoData();
    setTotalPage(13220);
    setError({ ...error, data: "" });
    // try {
    //   const response = await fetch(
    //     `https://api.coingecko.com/api/v3/coins/list`
    //   );
    //   const data = await response.json();
    //   setTotalPage(data.length);
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }
          let errorResponse = await res.json();
          setError({ ...error, data: errorResponse.error });
          throw new Error(errorResponse.error);
        })
        .then((json) => json);

      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCoinData = async (coinId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=true&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
      );
      const data = await response.json();
      setCoinData(data);
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
    setPerPage(10);
  };
  useLayoutEffect(() => {
    getCryptoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinSearch, currency, sortBy, page, perPage]);
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
        setPerPage,
        perPage,
        getCoinData,
        coinData,
        error,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
