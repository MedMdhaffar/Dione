import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Bitcoin, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { CryptoCurrency, NFTCollection } from '../types/dashboard';
import DashboardStats from '../components/dashboard/DashboardStats';
import CryptoTable from '../components/dashboard/CryptoTable';
import NFTTable from '../components/dashboard/NFTTable';
import AnimatedBackground from '../components/AnimatedBackground';

const TrendsDashboard: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'crypto' | 'nft'>('crypto');
  const [timeframe, setTimeframe] = useState<'1h' | '6h' | '18h' | '24h'>('24h');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from APIs
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      current_price: 43250.50,
      market_cap: 847000000000,
      market_cap_rank: 1,
      price_change_percentage_1h: 0.5,
      price_change_percentage_6h: 2.1,
      price_change_percentage_18h: -1.2,
      price_change_percentage_24h: 3.4,
      total_volume: 28000000000,
      circulating_supply: 19600000,
      max_supply: 21000000,
      sparkline_in_7d: {
        price: [42000, 42500, 43000, 42800, 43200, 43500, 43250]
      }
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      current_price: 2650.75,
      market_cap: 318000000000,
      market_cap_rank: 2,
      price_change_percentage_1h: -0.3,
      price_change_percentage_6h: 1.8,
      price_change_percentage_18h: 0.9,
      price_change_percentage_24h: 2.1,
      total_volume: 15000000000,
      circulating_supply: 120000000,
      max_supply: null,
      sparkline_in_7d: {
        price: [2600, 2620, 2640, 2630, 2650, 2670, 2651]
      }
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'sol',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      current_price: 98.45,
      market_cap: 43000000000,
      market_cap_rank: 5,
      price_change_percentage_1h: 1.2,
      price_change_percentage_6h: 4.5,
      price_change_percentage_18h: 2.8,
      price_change_percentage_24h: 7.3,
      total_volume: 2800000000,
      circulating_supply: 437000000,
      max_supply: null,
      sparkline_in_7d: {
        price: [92, 94, 96, 95, 97, 99, 98.45]
      }
    }
  ]);

  const [nftData, setNftData] = useState<NFTCollection[]>([
    {
      id: 'bored-ape-yacht-club',
      name: 'Bored Ape Yacht Club',
      image: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=256',
      floor_price: 12.5,
      volume_24h: 450.2,
      volume_change_24h: 15.3,
      market_cap: 125000,
      owners: 5400,
      total_supply: 10000,
      price_change_1h: 0.8,
      price_change_6h: 2.1,
      price_change_18h: -1.5,
      price_change_24h: 5.2
    },
    {
      id: 'cryptopunks',
      name: 'CryptoPunks',
      image: 'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&w=256',
      floor_price: 65.8,
      volume_24h: 1250.7,
      volume_change_24h: -8.2,
      market_cap: 658000,
      owners: 3500,
      total_supply: 10000,
      price_change_1h: -0.5,
      price_change_6h: -1.2,
      price_change_18h: -2.8,
      price_change_24h: -3.1
    },
    {
      id: 'azuki',
      name: 'Azuki',
      image: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=256',
      floor_price: 8.2,
      volume_24h: 320.5,
      volume_change_24h: 22.1,
      market_cap: 82000,
      owners: 4200,
      total_supply: 10000,
      price_change_1h: 1.5,
      price_change_6h: 3.2,
      price_change_18h: 4.1,
      price_change_24h: 8.7
    }
  ]);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={`min-h-screen overflow-x-hidden transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800'
    }`}>
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className={`backdrop-blur-md border-b transition-all duration-300 ${
          isDark 
            ? 'bg-black/20 border-cyan-500/20' 
            : 'bg-white/20 border-purple-500/20'
        }`}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleGoBack}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-black/10'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                    isDark 
                      ? 'from-cyan-400 to-purple-400' 
                      : 'from-purple-600 to-pink-600'
                  }`}>
                    Trends Dashboard
                  </h1>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Real-time cryptocurrency and NFT market data
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Timeframe Selector */}
                <div className={`flex rounded-lg border transition-colors duration-300 ${
                  isDark ? 'border-gray-600' : 'border-gray-300'
                }`}>
                  {(['1h', '6h', '18h', '24h'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 text-sm font-medium transition-all duration-300 ${
                        timeframe === tf
                          ? isDark
                            ? 'bg-cyan-500 text-white'
                            : 'bg-purple-500 text-white'
                          : isDark
                            ? 'text-gray-300 hover:text-white'
                            : 'text-gray-600 hover:text-gray-800'
                      } ${tf === '1h' ? 'rounded-l-lg' : tf === '24h' ? 'rounded-r-lg' : ''}`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-black/10'
                  }`}
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Dashboard Stats */}
          <DashboardStats
            totalMarketCap={1650000000000}
            marketCapChange={2.4}
            totalVolume={85000000000}
            volumeChange={-5.2}
            btcDominance={51.3}
            activeCoins={2847}
          />

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8">
            <button
              onClick={() => setActiveTab('crypto')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'crypto'
                  ? isDark
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-black/10'
              }`}
            >
              <Bitcoin className="w-5 h-5" />
              <span>Cryptocurrencies</span>
            </button>
            <button
              onClick={() => setActiveTab('nft')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'nft'
                  ? isDark
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-black/10'
              }`}
            >
              <Palette className="w-5 h-5" />
              <span>NFT Collections</span>
            </button>
          </div>

          {/* Data Tables */}
          {activeTab === 'crypto' ? (
            <CryptoTable cryptos={cryptoData} timeframe={timeframe} />
          ) : (
            <NFTTable nfts={nftData} timeframe={timeframe} />
          )}
        </main>
      </div>
    </div>
  );
};

export default TrendsDashboard;