import React from 'react';
import { Youtube, Instagram, Facebook, Twitter, Sparkles, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Services: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
              isDark 
                ? 'from-purple-400 to-pink-400' 
                : 'from-purple-600 to-pink-600'
            }`}>
              Our Services
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Complete social media automation pipeline from trend detection to content publishing
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
              isDark 
                ? 'bg-black/40 border-cyan-500/20 hover:border-cyan-500/40' 
                : 'bg-white/40 border-purple-500/20 hover:border-purple-500/40'
            }`}>
              <div className="flex items-center mb-4">
                <Youtube className="w-8 h-8 text-red-500 mr-4" />
                <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Video Content Pipeline</h3>
              </div>
              <p className={`mb-4 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Automatically discover viral YouTube clips, extract the best moments, and create optimized content for TikTok and Instagram Reels.
              </p>
              <div className={`flex items-center transition-colors duration-300 ${
                isDark ? 'text-cyan-400' : 'text-purple-600'
              }`}>
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">Fully automated in minutes</span>
              </div>
            </div>
            
            <div className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
              isDark 
                ? 'bg-black/40 border-purple-500/20 hover:border-purple-500/40' 
                : 'bg-white/40 border-pink-500/20 hover:border-pink-500/40'
            }`}>
              <div className="flex items-center mb-4">
                <Sparkles className={`w-8 h-8 mr-4 transition-colors duration-300 ${
                  isDark ? 'text-purple-500' : 'text-pink-600'
                }`} />
                <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>AI Content Generation</h3>
              </div>
              <p className={`mb-4 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Generate stunning images and engaging text content related to trending topics using advanced AI models.
              </p>
              <div className={`flex items-center transition-colors duration-300 ${
                isDark ? 'text-purple-400' : 'text-pink-600'
              }`}>
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">High-quality content in seconds</span>
              </div>
            </div>
          </div>
          
          <div className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 ${
            isDark 
              ? 'bg-black/30 border-pink-500/20' 
              : 'bg-white/30 border-purple-500/20'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>Multi-Platform Publishing</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
                <p className={`font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Instagram</p>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Posts & Reels</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Facebook className="w-8 h-8 text-white" />
                </div>
                <p className={`font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Facebook</p>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Posts & Stories</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Twitter className="w-8 h-8 text-white" />
                </div>
                <p className={`font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Twitter/X</p>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Tweets & Threads</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <p className={`font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>TikTok</p>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Short Videos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;