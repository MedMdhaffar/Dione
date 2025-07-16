import { createContext, useEffect, useState, ReactNode } from "react";

// Define types for context value and provider props
type Currency = {
  name: string;
  symbol: string;
};

type CoinContextType = {
  allCoin: any[];
  currency: Currency;
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
};

type CoinContextProviderProps = {
  children: ReactNode;
};

export const CoinContext = createContext<CoinContextType>({
  allCoin: [],
  currency: { name: "usd", symbol: "$" },
  setCurrency: () => {},
});

const CoinContextProvider = (props: CoinContextProviderProps) => {
  const [allCoin, setAllCoins] = useState<any[]>([]);
  const [currency, setCurrency] = useState<Currency>({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-tjToq5RouAxTiThL24EsFCgA",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoins(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue: CoinContextType = { allCoin, currency, setCurrency };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};
export default CoinContextProvider;
