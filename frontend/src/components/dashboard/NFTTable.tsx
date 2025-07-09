import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { NFTCollection } from '../../types/dashboard';
import GenerationModal from './GenerationModal';

interface NFTTableProps {
  nfts: NFTCollection[];
  timeframe: '1h' | '6h' | '18h' | '24h';
}

const NFTTable: React.FC<NFTTableProps> = ({ nfts, timeframe }) => {
  const { isDark } = useTheme();
  const [selectedNFT, setSelectedNFT] = useState<NFTCollection | null>(null);
  const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false);

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ETH`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K ETH`;
    return `${volume.toFixed(1)} ETH`;
  };

  const getPriceChange = (nft: NFTCollection) => {
    switch (timeframe) {
      case '1h': return nft.price_change_1h;
      case '6h': return nft.price_change_6h;
      case '18h': return nft.price_change_18h;
      case '24h': return nft.price_change_24h;
      default: return nft.price_change_24h;
    }
  };

  const handleGenerate = (nft: NFTCollection) => {
    setSelectedNFT(nft);
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
                }`}>Collection</th>
                <th className={`text-right p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Floor Price</th>
                <th className={`text-right p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>{timeframe}</th>
                <th className={`text-right p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Volume (24h)</th>
                <th className={`text-right p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Owners</th>
                <th className={`text-right p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Items</th>
                <th className={`text-center p-4 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Generate</th>
              </tr>
            </thead>
            <tbody>
              {nfts.map((nft, index) => {
                const priceChange = getPriceChange(nft);
                const isPositive = priceChange > 0;
                
                return (
                  <tr key={nft.id} className={`border-b hover:bg-opacity-50 transition-all duration-200 ${
                    isDark 
                      ? 'border-gray-700 hover:bg-cyan-500/5' 
                      : 'border-gray-200 hover:bg-purple-500/5'
                  }`}>
                    <td className={`p-4 transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {index + 1}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={nft.image} 
                          alt={nft.name}
                          className="w-8 h-8 rounded-lg"
                        />
                        <div>
                          <div className={`font-semibold transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-gray-800'
                          }`}>
                            {nft.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={`p-4 text-right font-semibold transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {formatPrice(nft.floor_price)}
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
                      {formatVolume(nft.volume_24h)}
                    </td>
                    <td className={`p-4 text-right transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <div className="flex items-center justify-end space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{nft.owners.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className={`p-4 text-right transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
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
        onClose={() => setIsGenerationModalOpen(false)}
        item={selectedNFT}
        type="nft"
      />
    </>
  );
};

export default NFTTable;