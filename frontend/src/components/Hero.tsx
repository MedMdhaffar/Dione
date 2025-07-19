import React from "react";
import { Play, Zap, Bot, TrendingUp } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import AuthModal from "./AuthModal";

const Hero: React.FC = () => {
  const { isDark } = useTheme();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  return (
    <section id='home' className="relative min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full border mb-6 transition-all duration-300 ${
              isDark
                ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20"
                : "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20"
            }`}
          >
            <Zap
              className={`w-4 h-4 mr-2 transition-colors duration-300 ${
                isDark ? "text-cyan-400" : "text-purple-600"
              }`}
            />
            <span
              className={`text-sm transition-colors duration-300 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Powered by DIONE Team
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                isDark
                  ? "from-cyan-400 via-purple-400 to-pink-400"
                  : "from-purple-600 via-pink-600 to-orange-500"
              }`}
            >
              TrendWave
            </span>
            <br />
            <span
              className={`text-3xl md:text-5xl transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              AI Social Media Automation
            </span>
          </h1>

          <p
            className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Detect trending topics, create viral content, and automate your
            social media presence across TikTok, Instagram, Facebook, and
            Twitter with cutting-edge AI technology.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className={`group px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center ${
              isDark
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-cyan-500/25"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25"
            }`}
          >
            <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Start Creating
          </button>
          <button
            className={`px-8 py-4 border rounded-full font-semibold text-lg transition-all duration-300 flex items-center ${
              isDark
                ? "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                : "border-purple-500/50 text-purple-600 hover:bg-purple-500/10"
            }`}
          >
            <Bot className="w-5 h-5 mr-2" />
            View Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div
            className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 group ${
              isDark
                ? "bg-black/30 border-cyan-500/20 hover:border-cyan-500/40"
                : "bg-white/30 border-purple-500/20 hover:border-purple-500/40"
            }`}
          >
            <TrendingUp
              className={`w-8 h-8 mb-4 group-hover:scale-110 transition-transform ${
                isDark ? "text-cyan-400" : "text-purple-600"
              }`}
            />
            <h3
              className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Trend Detection
            </h3>
            <p
              className={`transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Advanced web scraping to identify viral topics in real-time
            </p>
          </div>

          <div
            className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 group ${
              isDark
                ? "bg-black/30 border-purple-500/20 hover:border-purple-500/40"
                : "bg-white/30 border-pink-500/20 hover:border-pink-500/40"
            }`}
          >
            <Play
              className={`w-8 h-8 mb-4 group-hover:scale-110 transition-transform ${
                isDark ? "text-purple-400" : "text-pink-600"
              }`}
            />
            <h3
              className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Video Creation
            </h3>
            <p
              className={`transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Automatically find, edit, and upload viral clips to TikTok & Reels
            </p>
          </div>

          <div
            className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 group ${
              isDark
                ? "bg-black/30 border-pink-500/20 hover:border-pink-500/40"
                : "bg-white/30 border-orange-500/20 hover:border-orange-500/40"
            }`}
          >
            <Bot
              className={`w-8 h-8 mb-4 group-hover:scale-110 transition-transform ${
                isDark ? "text-pink-400" : "text-orange-600"
              }`}
            />
            <h3
              className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              AI Content
            </h3>
            <p
              className={`transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Generate images and posts for all social media platforms
            </p>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
