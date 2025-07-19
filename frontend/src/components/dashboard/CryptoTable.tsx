import React, { useContext, useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { CoinContext } from '../../contexts/CoinContext';
import { CoinProps } from '../../types/dashboard';
import GenerationModal from './GenerationModal';

const CryptoTable: React.FC = () => {
  const { isDark } = useTheme();
  const { currency,allCoin } = useContext(CoinContext);

  const [selectedCrypto, setSelectedCrypto] = useState<CoinProps | null>(null);
  const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false);
  const [displayCoin, setDisplayCoin] = useState<CoinProps[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value === '') setDisplayCoin(allCoin);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = allCoin.filter((coin) =>
      coin.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(filtered);
  };

  const formatPrice = (price: number) => {
    if (price < 0.01) return `${price.toFixed(6)}`;
    if (price < 1) return `${price.toFixed(4)}`;
    return `${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (cap: number) => {
    if (cap >= 1e12) return `${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `${(cap / 1e9).toFixed(2)}B`;
    if (cap >= 1e6) return `${(cap / 1e6).toFixed(2)}M`;
    return `${cap.toLocaleString()}`;
  };

  const handleGenerate = (crypto: CoinProps) => {
    setSelectedCrypto(crypto);
    setIsGenerationModalOpen(true);
  };

  return (
    <>
      <form onSubmit={searchHandler} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          list="coinlist"
          value={input}
          onChange={inputHandler}
          placeholder="Search for a cryptocurrency..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 text-sm"
        />
        <datalist id="coinlist">
          {allCoin.map((coin, idx) => (
            <option key={idx} value={coin.name} />
          ))}
        </datalist>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Search
        </button>
      </form>

      <div className={`backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-black/40 border-cyan-500/20' : 'bg-white/40 border-purple-500/20'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
              <tr>
                <th className="p-4 text-left font-semibold">#</th>
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-right font-semibold">Price</th>
                <th className="p-4 text-right font-semibold">% 24h</th>
                <th className="p-4 text-right font-semibold">Market Cap</th>
                <th className="p-4 text-center font-semibold">Generate</th>
              </tr>
            </thead>
            <tbody>
              {displayCoin.map((crypto, idx) => {
                const change = crypto.price_change_percentage_24h;
                const isPositive = change > 0;

                return (
                  <tr key={idx} className={`border-b hover:bg-opacity-50 ${
                    isDark ? 'border-gray-700 hover:bg-cyan-500/5' : 'border-gray-200 hover:bg-purple-500/5'
                  }`}>
                    <td className="p-4 text-gray-500">{crypto.market_cap_rank}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="font-semibold">{crypto.name}</div>
                          <div className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold">{currency.symbol} {formatPrice(crypto.current_price)}</td>
                    <td className="p-4 text-right">
                      <div className={`flex justify-end items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{Math.abs(change).toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold">{formatMarketCap(crypto.market_cap)}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleGenerate(crypto)}
                        className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 transition-transform"
                      >
                        <Zap className="w-4 h-4 text-white" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <GenerationModal
        isOpen={isGenerationModalOpen}
        onClose={() => setIsGenerationModalOpen(false)}
        item={selectedCrypto}
        type="crypto"
      />
    </>
  );
};

export default CryptoTable;
