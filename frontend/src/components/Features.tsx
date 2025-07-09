import React from 'react';
import { Search, Video, Image, Share2, Zap, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Features: React.FC = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: Search,
      title: "Trend Detection",
      description: "Advanced web scraping algorithms detect trending topics across multiple platforms in real-time",
      color: "cyan"
    },
    {
      icon: Video,
      title: "Viral Video Creation",
      description: "Find viral YouTube clips, automatically edit them, and upload to TikTok and Instagram Reels",
      color: "purple"
    },
    {
      icon: Image,
      title: "AI Image Generation",
      description: "Create stunning, topic-relevant images using advanced AI models for maximum engagement",
      color: "pink"
    },
    {
      icon: Share2,
      title: "Multi-Platform Posting",
      description: "Automatically post content across Facebook, Twitter, Instagram, and other social platforms",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process trends and create content in minutes, not hours. Stay ahead of the competition",
      color: "yellow"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Smart algorithms ensure your content reaches the right audience at the perfect time",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    const darkColors = {
      cyan: "from-cyan-500 to-cyan-600 border-cyan-500/20 hover:border-cyan-500/40",
      purple: "from-purple-500 to-purple-600 border-purple-500/20 hover:border-purple-500/40",
      pink: "from-pink-500 to-pink-600 border-pink-500/20 hover:border-pink-500/40",
      blue: "from-blue-500 to-blue-600 border-blue-500/20 hover:border-blue-500/40",
      yellow: "from-yellow-500 to-yellow-600 border-yellow-500/20 hover:border-yellow-500/40",
      green: "from-green-500 to-green-600 border-green-500/20 hover:border-green-500/40"
    };
    
    const lightColors = {
      cyan: "from-cyan-400 to-blue-500 border-cyan-400/30 hover:border-cyan-500/50",
      purple: "from-purple-400 to-purple-600 border-purple-400/30 hover:border-purple-500/50",
      pink: "from-pink-400 to-pink-600 border-pink-400/30 hover:border-pink-500/50",
      blue: "from-blue-400 to-blue-600 border-blue-400/30 hover:border-blue-500/50",
      yellow: "from-yellow-400 to-orange-500 border-yellow-400/30 hover:border-yellow-500/50",
      green: "from-green-400 to-green-600 border-green-400/30 hover:border-green-500/50"
    };
    
    return isDark ? darkColors[color as keyof typeof darkColors] : lightColors[color as keyof typeof lightColors];
  };

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
              isDark 
                ? 'from-cyan-400 to-purple-400' 
                : 'from-purple-600 to-pink-600'
            }`}>
              Powerful Features
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Everything you need to dominate social media with AI-powered automation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group backdrop-blur-sm border rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 ${
                isDark ? 'bg-black/30' : 'bg-white/30'
              } ${getColorClasses(feature.color)}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(feature.color).split(' ')[0]} ${getColorClasses(feature.color).split(' ')[1]} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>{feature.title}</h3>
              <p className={`leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;