import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import "./Home.css";

// Define a type for a coin object
type Coin = {
  market_cap_rank: number;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);

  const [displayCoin, setDisplayCoin] = useState<Coin[]>([]);
  const [input, setInput] = useState("");

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const coins = allCoin.filter((item: Coin) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="Home">
      <div className="Hero">
        <h1>Welcome to the Cryptos Dashboard</h1>
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search for a cryptocurrency..."
            required
          />
          <datalist id="coinlist">
            {allCoin.map((item: Coin, index: number) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24 hour change</p>
          <p className="market-cap">market cap</p>
        </div>
        {displayCoin.map((item, index) => (
          <div className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
