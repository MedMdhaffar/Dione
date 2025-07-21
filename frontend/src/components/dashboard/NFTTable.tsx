import { useContext, useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { NftProps } from '../../types/dashboard';
import { NftContext } from '../../contexts/NftContext';
import GenerationModal from './GenerationModal';

const NFTTable = () => {
  const { isDark } = useTheme();
  const { allNfts } = useContext(NftContext);
  const [selectedNft, setSelectedNft] = useState<NftProps | null>(null);
  const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false);
  const [displayNft, setDisplayNft] = useState<NftProps[]>([]);
  const [input, setInput] = useState('');

  const formatPrice = (price: number) => `${price.toFixed(2)} ETH`;

  const formatVolume = (volume: number) => {
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K ETH`;
    return `${volume.toFixed(1)} ETH`;
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value === '') setDisplayNft(allNfts);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = allNfts.filter((nft) =>
      nft.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayNft(filtered);
  };

  const handleGenerate = (nft: NftProps) => {
    setSelectedNft(nft);
    setIsGenerationModalOpen(true);
  };

  useEffect(() => {
  const sorted = [...allNfts].sort((a, b) => {
    if (a.market_cap_rank && b.market_cap_rank) {
      return a.market_cap_rank - b.market_cap_rank;
    }
    return 0;
  });
  setDisplayNft(sorted);
}, [allNfts]);


  if (!allNfts.length) {
    return (
      <div className="w-full p-4 text-center text-gray-500 dark:text-gray-300">
        Loading NFT collections...
      </div>
    );
  }

  return (
    <>
      <form onSubmit={searchHandler} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          list="nftlist"
          value={input}
          onChange={inputHandler}
          placeholder="Search for an NFT..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black/20 text-sm"
        />
        <datalist id="nftlist">
          {allNfts.map((nft, idx) => (
            <option key={idx} value={nft.name} />
          ))}
        </datalist>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      <div
        className={`backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
          isDark ? 'bg-black/40 border-cyan-500/20' : 'bg-white/40 border-purple-500/20'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={`border-b transition-colors duration-300 ${
                isDark ? 'border-gray-700' : 'border-gray-300'
              }`}
            >
              <tr>
                <th className="text-left p-4 font-semibold">#</th>
                <th className="text-left p-4 font-semibold">Collection</th>
                <th className="text-right p-4 font-semibold">Floor Price</th>
                <th className="text-right p-4 font-semibold">Change</th>
                <th className="text-right p-4 font-semibold">Volume (24h)</th>
                <th className="text-right p-4 font-semibold">Items</th>
                <th className="text-center p-4 font-semibold">Generate</th>
              </tr>
            </thead>
            <tbody>
              {displayNft.map((nft) => {
                const priceChange = nft.floor_price_24h_percentage_change?.usd ?? 0;
                const isPositive = priceChange >= 0;

                return (
                  <tr
                    key={nft.market_cap_rank || nft.name} 
                    className={`border-b hover:bg-opacity-50 transition-all duration-200 ${
                      isDark
                        ? 'border-gray-700 hover:bg-cyan-500/5'
                        : 'border-gray-200 hover:bg-purple-500/5'
                    }`}
                  >
                    <td className="p-4 text-gray-500">{nft.market_cap_rank}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={nft.image.small}
                          alt={nft.name}
                          className="w-8 h-8 rounded-lg"
                        />
                        <div className="font-semibold">{nft.name}</div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {formatPrice(nft.floor_price.native_currency)}
                    </td>
                    <td className="p-4 text-right">
                      <div
                        className={`flex items-center justify-end space-x-1 ${
                          isPositive ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-semibold">
                          {priceChange.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {formatVolume(nft.volume_24h.native_currency)}
                    </td>
                    <td className="p-4 text-right">
                      {nft.total_supply.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleGenerate(nft)}
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
        onClose={() => {
          setIsGenerationModalOpen(false);
          setSelectedNft(null);
        }}
        item={selectedNft}
        type="nft"
      />
    </>
  );
};

export default NFTTable;
