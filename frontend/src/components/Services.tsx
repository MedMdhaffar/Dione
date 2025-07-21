import React from 'react';
import { Link } from 'react-router-dom';
import {
  Youtube,
  Sparkles,
  Clock,
  BarChart,
  TrendingUp,
  Activity,
  LayoutDashboard,
} from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import VideoGenerationModal from './services/VideoGenerationModal';
import PostGenerationModal from './services/PostGenerationModal';

const Services: React.FC = () => {
  const { isDark } = useTheme();
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);

  return (
    <>
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                  isDark
                    ? 'from-purple-400 to-pink-400'
                    : 'from-purple-600 to-pink-600'
                }`}
              >
                Our Services
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Complete social media automation pipeline from trend detection to content publishing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Generator */}
            <div className="space-y-8">
              <div
                className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  isDark
                    ? 'bg-black/40 border-cyan-500/20 hover:border-cyan-500/40'
                    : 'bg-white/40 border-purple-500/20 hover:border-purple-500/40'
                }`}
                onClick={() => setIsVideoModalOpen(true)}
              >
                <div className="flex items-center mb-4">
                  <Youtube className="w-8 h-8 text-red-500 mr-4" />
                  <h3
                    className={`text-2xl font-bold transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    Video Content Pipeline
                  </h3>
                </div>
                <p
                  className={`mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Enter any theme and automatically generate viral video content optimized for TikTok, Instagram Reels, and other platforms.
                </p>
                <div
                  className={`flex items-center transition-colors duration-300 ${
                    isDark ? 'text-cyan-400' : 'text-purple-600'
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">Click to try the generator</span>
                </div>
              </div>

              {/* Post Generator */}
              <div
                className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  isDark
                    ? 'bg-black/40 border-purple-500/20 hover:border-purple-500/40'
                    : 'bg-white/40 border-pink-500/20 hover:border-pink-500/40'
                }`}
                onClick={() => setIsPostModalOpen(true)}
              >
                <div className="flex items-center mb-4">
                  <Sparkles
                    className={`w-8 h-8 mr-4 transition-colors duration-300 ${
                      isDark ? 'text-purple-500' : 'text-pink-600'
                    }`}
                  />
                  <h3
                    className={`text-2xl font-bold transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    AI Content Generation
                  </h3>
                </div>
                <p
                  className={`mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Create engaging social media posts with AI-generated images and text content for any theme or topic.
                </p>
                <div
                  className={`flex items-center transition-colors duration-300 ${
                    isDark ? 'text-purple-400' : 'text-pink-600'
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">Click to try the generator</span>
                </div>
              </div>
            </div>

            {/* Trends Dashboard Link */}
            <Link
              to="/trends"
              className="group block transform transition-transform hover:scale-[1.02]"
            >
              <div
                className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                  isDark
                    ? 'bg-black/30 border-cyan-500/20'
                    : 'bg-white/30 border-purple-500/20'
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  Explore Market Trends
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  {/* Dashboard Overview */}
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <LayoutDashboard className="w-8 h-8 text-white" />
                    </div>
                    <p
                      className={`font-semibold transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Dashboard
                    </p>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Real-time insights
                    </p>
                  </div>

                  {/* Market Trends */}
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <p
                      className={`font-semibold transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Market Trends
                    </p>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Crypto & NFTs
                    </p>
                  </div>

                  {/* Analytics */}
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <BarChart className="w-8 h-8 text-white" />
                    </div>
                    <p
                      className={`font-semibold transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Analytics
                    </p>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Charts & data
                    </p>
                  </div>

                  {/* Live Activity */}
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <p
                      className={`font-semibold transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Live Activity
                    </p>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Real-time tracking
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <VideoGenerationModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <PostGenerationModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </>
  );
};

export default Services;
