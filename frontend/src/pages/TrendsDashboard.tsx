import { useState } from 'react';
import { ArrowLeft, Bitcoin, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedBackground from '../components/AnimatedBackground';
import Navbar from '../components/dashboard/Navbar';
import NFTTable from '../components/dashboard/NFTTable';
import CryptoTable from '../components/dashboard/CryptoTable';
import DashboardStats from '../components/dashboard/DashboardStats';

const TrendsDashboard = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'crypto' | 'nft'>('crypto');

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800'
      }`}
    >
      <AnimatedBackground />

      <div className="relative z-10">
        <header
          className={`backdrop-blur-md border-b transition-all duration-300 ${
            isDark ? 'bg-black/20 border-cyan-500/20' : 'bg-white/20 border-purple-500/20'
          }`}
        >
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
                  <h1
                    className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                      isDark ? 'from-cyan-400 to-purple-400' : 'from-purple-600 to-pink-600'
                    }`}
                  >
                    Trends Dashboard
                  </h1>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Real-time cryptocurrency and NFT market data
                  </p>
                </div>
              </div>
              {activeTab === 'crypto' && <Navbar />}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <DashboardStats
            totalMarketCap={1650000000000}
            marketCapChange={2.4}
            totalVolume={85000000000}
            volumeChange={-5.2}
            btcDominance={51.3}
            activeCoins={2847}
          />

          {/* Tabs */}
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

          {activeTab === 'crypto' ? <CryptoTable /> : <NFTTable />}
        </main>
      </div>
    </div>
  );
};

export default TrendsDashboard;
