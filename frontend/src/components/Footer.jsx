import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">FarmBazaar</h3>
            <p className="text-green-200">
              Connecting farmers and buyers directly, creating sustainable agricultural marketplaces.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white hover:text-green-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-green-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-green-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-green-200 hover:text-white">Home</a>
              </li>
              <li>
                <a href="/about" className="text-green-200 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="/services" className="text-green-200 hover:text-white">Services</a>
              </li>
              <li>
                <a href="/blog" className="text-green-200 hover:text-white">Farming Tips</a>
              </li>
              <li>
                <a href="/careers" className="text-green-200 hover:text-white">Careers</a>
              </li>
            </ul>
          </div>

          {/* Farmer Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Farmer Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/market-trends" className="text-green-200 hover:text-white">Market Trends</a>
              </li>
              <li>
                <a href="/education" className="text-green-200 hover:text-white">Educational Resources</a>
              </li>
              <li>
                <a href="/community" className="text-green-200 hover:text-white">Farmer Community</a>
              </li>
              <li>
                <a href="/pricing" className="text-green-200 hover:text-white">Pricing Information</a>
              </li>
              <li>
                <a href="/support" className="text-green-200 hover:text-white">Support Center</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1" />
                <span>123 Farm Road, Agricity, AC 12345</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>support@farmbazaar.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold">Subscribe to our Newsletter</h4>
              <p className="text-green-200 text-sm">Get the latest farming tips and market updates</p>
            </div>
            <div className="w-full md:w-96">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                />
                <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-green-950 text-center py-4 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200">
            © {currentYear} FarmBazaar. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-xs">
            <a href="/privacy" className="text-green-300 hover:text-white">Privacy Policy</a>
            <a href="/terms" className="text-green-300 hover:text-white">Terms of Service</a>
            <a href="/faq" className="text-green-300 hover:text-white">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}