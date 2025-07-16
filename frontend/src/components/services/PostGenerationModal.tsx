import React, { useState } from 'react';
import { X, FileText, Twitter, Loader2, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface PostGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostGenerationModal: React.FC<PostGenerationModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [theme, setTheme] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<{
    text: string;
    image: string;
    hashtags: string[];
  } | null>(null);

  if (!isOpen) return null;

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
    if (!theme.trim()) return;
    
    setIsGenerating(true);

    // Simulate post generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockPost = {
      text: `🔥 Exciting news in the world of ${theme}! Here's what's trending and why you should pay attention. The future is looking bright! ✨`,
      image: `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center`,
      hashtags: [`#${theme.toLowerCase().replace(/\s+/g, '')}`, '#trending', '#viral', '#content', '#socialmedia']
    };
    
    setGeneratedPost(mockPost);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setTheme('');
    setSelectedPlatforms(['instagram']);
    setGeneratedPost(null);
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-2xl transition-all duration-300 relative ${
        isDark 
          ? 'bg-black/40 border-cyan-500/20' 
          : 'bg-white/40 border-purple-500/20'
      }`}>
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

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${
              isDark ? 'from-purple-500 to-pink-500' : 'from-purple-500 to-pink-500'
            } flex items-center justify-center`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                AI Content Generation
              </h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Create engaging social media posts
              </p>
            </div>
          </div>
        </div>

        {!generatedPost ? (
          <>
            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Post Theme
              </h3>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Enter your post theme (e.g., technology, fitness, travel...)"
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'border-gray-600 bg-black/20 text-white focus:ring-cyan-500/20 focus:border-cyan-500/50'
                    : 'border-gray-300 bg-white/50 text-gray-800 focus:ring-purple-200 focus:border-purple-400'
                }`}
              />
            </div>

            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Target Platforms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = selectedPlatforms.includes(platform.id);
                  
                  return (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`p-4 rounded-lg border transition-all duration-300 flex items-center space-x-3 ${
                        isSelected
                          ? isDark
                            ? 'border-cyan-500/50 bg-cyan-500/10'
                            : 'border-purple-500/50 bg-purple-500/10'
                          : isDark
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
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

            <button
              onClick={handleGenerate}
              disabled={!theme.trim() || selectedPlatforms.length === 0 || isGenerating}
              className={`w-full py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Post...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Post
                </>
              )}
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className={`mb-6 p-6 rounded-xl border ${
              isDark 
                ? 'bg-green-500/10 border-green-500/20' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Post Generated Successfully!
              </h3>
              <div className={`p-4 rounded-lg mb-4 text-left ${
                isDark ? 'bg-black/20' : 'bg-white/50'
              }`}>
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src={generatedPost.image} 
                    alt="Generated content" 
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className={`mb-3 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {generatedPost.text}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {generatedPost.hashtags.map((hashtag, index) => (
                        <span 
                          key={index}
                          className={`text-sm px-2 py-1 rounded transition-colors duration-300 ${
                            isDark 
                              ? 'bg-cyan-500/20 text-cyan-400' 
                              : 'bg-purple-500/20 text-purple-600'
                          }`}
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Optimized for {selectedPlatforms.join(', ')}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleReset}
                className={`flex-1 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-600 text-white hover:bg-gray-500' 
                    : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                }`}
              >
                Generate Another
              </button>
              <button
                onClick={onClose}
                className={`flex-1 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostGenerationModal;
