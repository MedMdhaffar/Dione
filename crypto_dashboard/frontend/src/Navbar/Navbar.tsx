import { CoinContext } from "../context/CoinContext";
import "./Navbar.css";
import { useContext } from "react";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currecnyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  }; 

  return (
    <div className="navbar">
      <div className="nav-right">
        <select onChange={currecnyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select> 
      </div>
    </div>
  );
};

export default Navbar;
