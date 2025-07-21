import { createContext, useEffect, useState, ReactNode } from "react";

// Define types
interface CurrencyProps {
  name: string;
  symbol: string;
}

interface CoinContextTypeProps {
  allCoin: any[];
  currency: CurrencyProps;
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyProps>>;
}

type CoinContextProviderProps = {
  children: ReactNode;
};

// Create context with default values
export const CoinContext = createContext<CoinContextTypeProps>({
  allCoin: [],
  currency: { name: "usd", symbol: "$" },
  setCurrency: () => {},
});

const CoinContextProvider = ({ children }: CoinContextProviderProps) => {
  const [allCoin, setAllCoins] = useState<any[]>([]);
  const [currency, setCurrency] = useState<CurrencyProps>({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const apiKey = import.meta.env.VITE_COIN_GECKO_API_KEY;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },  
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await res.json();
      setAllCoins(data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue: CoinContextTypeProps = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
