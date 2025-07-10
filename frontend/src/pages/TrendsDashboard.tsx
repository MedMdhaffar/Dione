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
  const generateMockCryptoData = (): CryptoCurrency[] => {
    const cryptoNames = [
      'Bitcoin', 'Ethereum', 'Tether', 'BNB', 'Solana', 'XRP', 'USDC', 'Cardano', 'Dogecoin', 'Avalanche',
      'TRON', 'Chainlink', 'Polygon', 'Wrapped Bitcoin', 'Polkadot', 'Internet Computer', 'Litecoin', 'Shiba Inu', 'Uniswap', 'Ethereum Classic',
      'Bitcoin Cash', 'Stellar', 'Filecoin', 'Cosmos', 'Monero', 'VeChain', 'Algorand', 'Hedera', 'Cronos', 'Quant',
      'Aave', 'The Graph', 'Decentraland', 'Sandbox', 'Theta Network', 'Axie Infinity', 'Zcash', 'Tezos', 'Elrond', 'Flow',
      'Mana', 'Chiliz', 'Enjin Coin', 'Basic Attention Token', 'Compound', 'Maker', 'SushiSwap', 'Curve DAO Token', 'Yearn.finance', 'Synthetix',
      'UMA', 'Bancor', 'Loopring', 'Numeraire', 'Augur', 'Kyber Network', 'Balancer', 'Ren', 'Ocean Protocol', 'Fetch.ai',
      'Injective Protocol', 'Kava', 'Band Protocol', 'Storj', 'Civic', 'district0x', 'Aragon', 'Gnosis', 'Request Network', 'Power Ledger',
      'Golem', 'Status', 'Metal', 'TenX', 'Populous', 'Salt', 'Dentacoin', 'Verge', 'Siacoin', 'MaidSafeCoin',
      'Lisk', 'Stratis', 'Waves', 'Ark', 'Komodo', 'Pivx', 'GameCredits', 'Syscoin', 'DigiByte', 'Vertcoin',
      'Peercoin', 'Namecoin', 'Primecoin', 'Feathercoin', 'Novacoin', 'Terracoin', 'Megacoin', 'Worldcoin', 'Ixcoin', 'Devcoin'
    ];
    
    const symbols = [
      'btc', 'eth', 'usdt', 'bnb', 'sol', 'xrp', 'usdc', 'ada', 'doge', 'avax',
      'trx', 'link', 'matic', 'wbtc', 'dot', 'icp', 'ltc', 'shib', 'uni', 'etc',
      'bch', 'xlm', 'fil', 'atom', 'xmr', 'vet', 'algo', 'hbar', 'cro', 'qnt',
      'aave', 'grt', 'mana', 'sand', 'theta', 'axs', 'zec', 'xtz', 'egld', 'flow',
      'mana', 'chz', 'enj', 'bat', 'comp', 'mkr', 'sushi', 'crv', 'yfi', 'snx',
      'uma', 'bnt', 'lrc', 'nmr', 'rep', 'knc', 'bal', 'ren', 'ocean', 'fet',
      'inj', 'kava', 'band', 'storj', 'cvc', 'dnt', 'ant', 'gno', 'req', 'powr',
      'gnt', 'snt', 'mtl', 'pay', 'ppt', 'salt', 'dent', 'xvg', 'sc', 'maid',
      'lsk', 'strat', 'waves', 'ark', 'kmd', 'pivx', 'game', 'sys', 'dgb', 'vtc',
      'ppc', 'nmc', 'xpm', 'ftc', 'nvc', 'trc', 'mec', 'wdc', 'ixc', 'dvc'
    ];

    return Array.from({ length: 100 }, (_, index) => {
      const basePrice = Math.random() * 50000 + 0.01;
      const marketCap = basePrice * (Math.random() * 1000000000 + 1000000);
      
      return {
        id: cryptoNames[index].toLowerCase().replace(/\s+/g, '-'),
        name: cryptoNames[index],
        symbol: symbols[index],
        image: `https://assets.coingecko.com/coins/images/${index + 1}/large/${symbols[index]}.png`,
        current_price: basePrice,
        market_cap: marketCap,
        market_cap_rank: index + 1,
        price_change_percentage_1h: (Math.random() - 0.5) * 10,
        price_change_percentage_6h: (Math.random() - 0.5) * 20,
        price_change_percentage_18h: (Math.random() - 0.5) * 30,
        price_change_percentage_24h: (Math.random() - 0.5) * 40,
        total_volume: marketCap * (Math.random() * 0.5 + 0.1),
        circulating_supply: Math.random() * 1000000000 + 1000000,
        max_supply: Math.random() > 0.3 ? Math.random() * 1000000000 + 1000000 : null,
        sparkline_in_7d: {
          price: Array.from({ length: 7 }, () => basePrice * (0.9 + Math.random() * 0.2))
        }
      };
    });
  };

  const generateMockNFTData = (): NFTCollection[] => {
    const nftNames = [
      'Bored Ape Yacht Club', 'CryptoPunks', 'Azuki', 'Mutant Ape Yacht Club', 'Otherdeeds for Otherside', 'Moonbirds', 'Doodles', 'CloneX', 'Art Blocks Curated', 'Pudgy Penguins',
      'Cool Cats NFT', 'World of Women', 'Veefriends', 'Chromie Squiggle', 'Meebits', 'Hashmasks', 'Gutter Cat Gang', 'Lazy Lions', 'Rumble Kong League', 'Deadfellaz',
      'Bored Ape Kennel Club', 'Invisible Friends', 'Okay Bears', 'DeGods', 'y00ts', 'Solana Monkey Business', 'Magic Eden', 'Thugbirdz', 'Aurory', 'Star Atlas',
      'Galactic Geckos', 'SolPunks', 'Degenerate Ape Academy', 'Solana Monkey Business', 'Famous Fox Federation', 'Taiyo Robotics', 'Shadowy Super Coder', 'Catalina Whale Mixer', 'Solana Monkey Business', 'Degen Ape Academy',
      'Crypto Baristas', 'Solana Monkey Business', 'Thugbirdz', 'Aurory', 'Star Atlas', 'Galactic Geckos', 'SolPunks', 'Degenerate Ape Academy', 'Solana Monkey Business', 'Famous Fox Federation',
      'Taiyo Robotics', 'Shadowy Super Coder', 'Catalina Whale Mixer', 'Solana Monkey Business', 'Degen Ape Academy', 'Crypto Baristas', 'Solana Monkey Business', 'Thugbirdz', 'Aurory', 'Star Atlas',
      'Galactic Geckos', 'SolPunks', 'Degenerate Ape Academy', 'Solana Monkey Business', 'Famous Fox Federation', 'Taiyo Robotics', 'Shadowy Super Coder', 'Catalina Whale Mixer', 'Solana Monkey Business', 'Degen Ape Academy',
      'Crypto Baristas', 'Solana Monkey Business', 'Thugbirdz', 'Aurory', 'Star Atlas', 'Galactic Geckos', 'SolPunks', 'Degenerate Ape Academy', 'Solana Monkey Business', 'Famous Fox Federation',
      'Taiyo Robotics', 'Shadowy Super Coder', 'Catalina Whale Mixer', 'Solana Monkey Business', 'Degen Ape Academy', 'Crypto Baristas', 'Solana Monkey Business', 'Thugbirdz', 'Aurory', 'Star Atlas',
      'Galactic Geckos', 'SolPunks', 'Degenerate Ape Academy', 'Solana Monkey Business', 'Famous Fox Federation', 'Taiyo Robotics', 'Shadowy Super Coder', 'Catalina Whale Mixer', 'Solana Monkey Business', 'Degen Ape Academy'
    ];

    return Array.from({ length: 100 }, (_, index) => {
      const floorPrice = Math.random() * 100 + 0.1;
      const volume = Math.random() * 5000 + 10;
      
      return {
        id: nftNames[index].toLowerCase().replace(/\s+/g, '-'),
        name: nftNames[index],
        image: `https://i.seadn.io/gae/mock-nft-${index + 1}?auto=format&w=256`,
        floor_price: floorPrice,
        volume_24h: volume,
        volume_change_24h: (Math.random() - 0.5) * 50,
        market_cap: floorPrice * (Math.random() * 50000 + 1000),
        owners: Math.floor(Math.random() * 8000 + 500),
        total_supply: Math.floor(Math.random() * 10000 + 1000),
        price_change_1h: (Math.random() - 0.5) * 15,
        price_change_6h: (Math.random() - 0.5) * 25,
        price_change_18h: (Math.random() - 0.5) * 35,
        price_change_24h: (Math.random() - 0.5) * 45
      };
    });
  };

  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>(generateMockCryptoData());
  const [nftData, setNftData] = useState<NFTCollection[]>(generateMockNFTData());

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