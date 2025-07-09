import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Play, FileText, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { CryptoCurrency, GenerationOptions } from '../../types/dashboard';
import GenerationModal from './GenerationModal';
import MiniChart from './MiniChart';

interface CryptoTableProps {
  cryptos: CryptoCurrency[];
  timeframe: '1h' | '6h' | '18h' | '24h';
}

const CryptoTable: React.FC<CryptoTableProps> = ({ cryptos, timeframe }) => {
  const { isDark } = useTheme();
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false);

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const getPriceChange = (crypto: CryptoCurrency) => {
    switch (timeframe) {
      case '1h': return crypto.price_change_percentage_1h;
      case '6h': return crypto.price_change_percentage_6h;
      case '18h': return crypto.price_change_percentage_18h;
      case '24h': return crypto.price_change_percentage_24h;
      default: return crypto.price_change_percentage_24h;
    }
  };

  const handleGenerate = (crypto: CryptoCurrency) => {
    setSelectedCrypto(crypto);
    setIsGenerationModalOpen(true);
  };

  return (
    <>
      <div className={`backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark 
          ? 'bg-black/40 border-cyan-500/20' 
          : 'bg-white/40 border-purple-500/20'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`border-b transition-colors duration-300 ${
              isDark ? 'border-gray-700' : 'border-gray-300'
            }`}>
              <tr>
                <th className={`text-left p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>#</th>
                <th className={`text-left p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Name</th>
                <th className={`text-right p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Price</th>
                <th className={`text-right p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>{timeframe}</th>
                <th className={`text-right p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Market Cap</th>
                <th className={`text-right p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Volume (24h)</th>
                <th className={`text-center p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Last 7 Days</th>
                <th className={`text-center p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Generate</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((crypto) => {
                const priceChange = getPriceChange(crypto);
                const isPositive = priceChange > 0;
                
                return (
                  <tr key={crypto.id} className={`border-b hover:bg-opacity-50 transition-all duration-200 ${
                    isDark 
                      ? 'border-gray-700 hover:bg-cyan-500/5' 
                      : 'border-gray-200 hover:bg-purple-500/5'
                  }`}>
                    <td className={`p-4 transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {crypto.market_cap_rank}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={crypto.image} 
                          alt={crypto.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className={`font-semibold transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-gray-800'
                          }`}>
                            {crypto.name}
                          </div>
                          <div className={`text-sm transition-colors duration-300 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {crypto.symbol.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={`p-4 text-right font-semibold transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {formatPrice(crypto.current_price)}
                    </td>
                    <td className="p-4 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        isPositive ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-semibold">
                          {Math.abs(priceChange).toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className={`p-4 text-right font-semibold transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {formatMarketCap(crypto.market_cap)}
                    </td>
                    <td className={`p-4 text-right transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {formatMarketCap(crypto.total_volume)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <MiniChart data={crypto.sparkline_in_7d.price} isPositive={isPositive} />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleGenerate(crypto)}
                          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                            isDark 
                              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-cyan-500/25' 
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25'
                          }`}
                        >
                          <Zap className="w-4 h-4 text-white" />
                        </button>
                      </div>
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