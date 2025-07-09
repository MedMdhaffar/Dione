import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface DashboardStatsProps {
  totalMarketCap: number;
  marketCapChange: number;
  totalVolume: number;
  volumeChange: number;
  btcDominance: number;
  activeCoins: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalMarketCap,
  marketCapChange,
  totalVolume,
  volumeChange,
  btcDominance,
  activeCoins
}) => {
  const { isDark } = useTheme();

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const stats = [
    {
      title: 'Total Market Cap',
      value: formatLargeNumber(totalMarketCap),
      change: marketCapChange,
      icon: DollarSign,
      color: 'cyan'
    },
    {
      title: '24h Volume',
      value: formatLargeNumber(totalVolume),
      change: volumeChange,
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'BTC Dominance',
      value: `${btcDominance.toFixed(1)}%`,
      change: 0.5,
      icon: TrendingUp,
      color: 'orange'
    },
    {
      title: 'Active Coins',
      value: activeCoins.toLocaleString(),
      change: null,
      icon: Activity,
      color: 'green'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: isDark ? 'from-cyan-500 to-cyan-600' : 'from-cyan-400 to-blue-500',
      purple: isDark ? 'from-purple-500 to-purple-600' : 'from-purple-400 to-purple-600',
      orange: isDark ? 'from-orange-500 to-orange-600' : 'from-orange-400 to-orange-600',
      green: isDark ? 'from-green-500 to-green-600' : 'from-green-400 to-green-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change ? stat.change > 0 : null;
        
        return (
          <div
            key={index}
            className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-black/40 border-cyan-500/20 hover:border-cyan-500/40' 
                : 'bg-white/40 border-purple-500/20 hover:border-purple-500/40'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(stat.color)} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              {stat.change !== null && (
                <div className={`flex items-center space-x-1 ${
                  isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-semibold">
                    {Math.abs(stat.change).toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {stat.value}
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;