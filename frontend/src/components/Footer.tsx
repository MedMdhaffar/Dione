import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  // CSS classes that depend on theme mode
  const bgClass = isDark ? "bg-black/40 border-cyan-500/20" : "bg-white/40 border-purple-500/20";
  const ringClass = isDark ? "ring-cyan-400/50" : "ring-purple-500/50";
  const textGradientFromTo = isDark ? "from-cyan-400 to-purple-400" : "from-purple-600 to-pink-600";
  const textColor = isDark ? "text-gray-400" : "text-gray-600";
  const bottomBorderClass = isDark ? "border-gray-800" : "border-gray-300";
  const bottomTextColor = isDark ? "text-gray-400" : "text-gray-600";
  const iconBgGradient = isDark
    ? "bg-gradient-to-r from-cyan-500 to-purple-500"
    : "bg-gradient-to-r from-purple-500 to-pink-500";

  return (
    <footer
      id="about"
      className={`relative backdrop-blur-sm border-t py-12 px-6 transition-all duration-300 ${bgClass}`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand + Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="/Dione.png"
                alt="DIONE Logo"
                className={`w-12 h-12 rounded-full ring-2 transition-all duration-300 ${ringClass}`}
              />
              <div>
                <h3
                  className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${textGradientFromTo}`}
                >
                  Trendwave
                </h3>
                <p className={`text-sm transition-colors duration-300 ${textColor}`}>
                  by TakTik Team
                </p>
              </div>
            </div>

            <p className={`mb-6 max-w-md transition-colors duration-300 ${textColor}`}>
              Revolutionizing social media automation with AI-powered trend detection and content
              creation. Built by the innovative TakTik team under DIONE.
            </p>

            <div className="flex space-x-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${iconBgGradient}`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/#home", label: "Home", className: "text-gray-400 hover:text-white" },
                {
                  href: "#features",
                  label: "Features",
                  className: isDark
                    ? "text-gray-300 hover:text-cyan-400"
                    : "text-gray-700 hover:text-purple-600",
                },
                {
                  href: "#services",
                  label: "Services",
                  className: isDark
                    ? "text-gray-300 hover:text-cyan-400"
                    : "text-gray-700 hover:text-purple-600",
                },
                {
                  href: "#about",
                  label: "About",
                  className: isDark
                    ? "text-gray-300 hover:text-cyan-400"
                    : "text-gray-700 hover:text-purple-600",
                },
              ].map(({ href, label, className }) => (
                <li key={label}>
                  <a href={href} className={`transition-colors duration-300 ${className}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Video Content Pipeline",
                "AI Content Generation",
                "Explore Market Trends",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Notice */}
        <div
          className={`border-t mt-8 pt-8 text-center transition-colors duration-300 ${bottomBorderClass}`}
        >
          <p className={`transition-colors duration-300 ${bottomTextColor}`}>
            © 2025 Trendwave by TakTik Team. Powered by DIONE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
