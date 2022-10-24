import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { CryptoContext } from "./CryptoContext";

//Create context Object
export const StorageContext = createContext({});

//Create provider component
export const StorageProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState();
  const { currency, sortBy } = useContext(CryptoContext);
  const saveCoins = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));
    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      let newCoin = [...oldCoins, coinId];
      setAllCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };
  const removeCoins = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));
    let newCoins = oldCoins.filter((coin) => coin !== coinId);
    setAllCoins(newCoins);
    localStorage.setItem("coins", JSON.stringify(newCoins));
  };

  const getSavedData = async (totalCoins = allCoins) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      );
      const data = await response.json();
      setSavedData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const resetSavedData = () => {
    getSavedData();
  };
  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins);
    } else {
      setSavedData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCoins]);
  useLayoutEffect(() => {
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;
    if (!isThere) {
      //set localstorage with empty array
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      //set the state with the current values from the local storage
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setAllCoins(totalCoins);
      if (totalCoins.length > 0) {
        getSavedData(totalCoins);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StorageContext.Provider
      value={{
        allCoins,
        saveCoins,
        removeCoins,
        savedData,
        currency,
        resetSavedData,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
