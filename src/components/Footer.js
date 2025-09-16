import React from "react";
import { Link } from "react-router-dom";
import {
  Cloud,
  Github,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ClimaGraph</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional weather report generator with advanced analytics,
              interactive charts, and comprehensive weather data for any
              location worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/gandhamprakashtech"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/GandhamPrakash_"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/gandhamkumarnslprakash/"
                className="text-gray-400 hover-linkedin transition-colors duration-200"
                aria-label="LinkedIn Profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li></li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Home
              </a>
              <li>
                <Link
                  to="/weather"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Weather Report
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  History
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Vijayawada</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+91 9392668228</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">info@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} ClimaGraph. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
