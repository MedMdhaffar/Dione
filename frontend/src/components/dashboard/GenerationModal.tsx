import React, { useState } from 'react';
import { X, Play, FileText, Twitter, Loader2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { CoinProps, NftProps } from '../../types/dashboard';

interface GenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CoinProps | NftProps | null;
  type: 'crypto' | 'nft';
}   

const GenerationModal: React.FC<GenerationModalProps> = ({ isOpen, onClose, item, type }) => {
  const { isDark } = useTheme();
  const [selectedType, setSelectedType] = useState<'video' | 'post'>('video');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['tiktok']);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen || !item) return null;

  // Safe get image function
  const getItemImage = () => {
    if (!item) return '';
    if (typeof item.image === 'string') return item.image;
    if (item.image && typeof item.image === 'object' && 'small' in item.image) {
      return item.image.small;
    }
    return '';
  };

  const platforms = [
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'from-cyan-500 to-blue-500' },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    onClose();
    
    // Show success notification (you can implement this)
    alert(`Generated ${selectedType} content for ${item.name} on ${selectedPlatforms.join(', ')}`);
  };

  const getItemName = () => {
    if (type === 'crypto') {
      return (item as CoinProps).name;
    }
    return (item as NftProps).name;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-2xl transition-all duration-300 relative ${
        isDark 
          ? 'bg-black/40 border-cyan-500/20' 
          : 'bg-white/40 border-purple-500/20'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ${
            isDark 
              ? 'text-gray-400 hover:text-white hover:bg-white/10' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-black/10'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img 
              src={getItemImage()} 
              alt={getItemName()}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Generate Content
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                for {getItemName()}
              </p>
            </div>
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="mb-8">
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Content Type
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedType('video')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-3 ${
                selectedType === 'video'
                  ? isDark
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-purple-500 bg-purple-500/10'
                  : isDark
                    ? 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Play className={`w-6 h-6 ${
                selectedType === 'video'
                  ? isDark ? 'text-cyan-400' : 'text-purple-600'
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <div className="text-left">
                <div className={`font-semibold transition-colors duration-300 ${
                  selectedType === 'video'
                    ? isDark ? 'text-cyan-400' : 'text-purple-600'
                    : isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Video Content
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Short-form videos for TikTok, Reels
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('post')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-3 ${
                selectedType === 'post'
                  ? isDark
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-purple-500 bg-purple-500/10'
                  : isDark
                    ? 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <FileText className={`w-6 h-6 ${
                selectedType === 'post'
                  ? isDark ? 'text-cyan-400' : 'text-purple-600'
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <div className="text-left">
                <div className={`font-semibold transition-colors duration-300 ${
                  selectedType === 'post'
                    ? isDark ? 'text-cyan-400' : 'text-purple-600'
                    : isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Social Post
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Images and text for social media
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="mb-8">
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Select Platforms
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              const isSelected = selectedPlatforms.includes(platform.id);
              
              return (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`p-3 rounded-lg border transition-all duration-300 flex items-center space-x-2 ${
                    isSelected
                      ? isDark
                        ? 'border-cyan-500/50 bg-cyan-500/10'
                        : 'border-purple-500/50 bg-purple-500/10'
                      : isDark
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className={`font-medium transition-colors duration-300 ${
                    isSelected
                      ? isDark ? 'text-cyan-400' : 'text-purple-600'
                      : isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {platform.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={selectedPlatforms.length === 0 || isGenerating}
          className={`w-full py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-cyan-500/25' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Generate {selectedType === 'video' ? 'Video' : 'Post'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GenerationModal;
