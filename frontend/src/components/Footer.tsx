import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer
      id="about"
      className={`relative backdrop-blur-sm border-t py-12 px-6 transition-all duration-300 ${
        isDark
          ? "bg-black/40 border-cyan-500/20"
          : "bg-white/40 border-purple-500/20"
      }`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="/Dione.png"
                alt="DIONE Team"
                className={`w-12 h-12 rounded-full ring-2 transition-all duration-300 ${
                  isDark ? "ring-cyan-400/50" : "ring-purple-500/50"
                }`}
              />
              <div>
                <h3
                  className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                    isDark
                      ? "from-cyan-400 to-purple-400"
                      : "from-purple-600 to-pink-600"
                  }`}
                >
                  Trendwave
                </h3>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  by TakTik Team
                </p>
              </div>
            </div>
            <p
              className={`mb-6 max-w-md transition-colors duration-300 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Revolutionizing social media automation with AI-powered trend
              detection and content creation. Built by the innovative TakTik
              team under DIONE.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${
                  isDark
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${
                  isDark
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${
                  isDark
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${
                  isDark
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className={`transition-colors duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about    "
                  className={`transition-colors duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors duration-300 ${
                    isDark
                      ? "text-gray-400 hover:text-cyan-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t mt-8 pt-8 text-center transition-colors duration-300 ${
            isDark ? "border-gray-800" : "border-gray-300"
          }`}
        >
          <p
            className={`transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © 2025 Trendwave by TakTik Team. Powered by DIONE. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
