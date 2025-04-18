import { useState } from 'react';
import { ArrowRight, Shield, FileCheck, TrendingUp, Coins } from 'lucide-react';

export default function HomePage() {
  const [isHoveredFarmer, setIsHoveredFarmer] = useState(false);
  const [isHoveredBuyer, setIsHoveredBuyer] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Revolutionizing Contract Farming with Blockchain</h1>
              <p className="text-xl mb-8">Secure pre-harvest contracts, transparent transactions, and guaranteed payments between farmers and buyers.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="/connect-wallet" className="bg-white text-green-800 px-6 py-3 rounded-md font-medium text-center hover:bg-green-100 transition flex items-center justify-center">
                  Connect Wallet <ArrowRight size={18} className="ml-2" />
                </a>
                <a href="/learn-more" className="border border-white text-white px-6 py-3 rounded-md font-medium text-center hover:bg-green-800 transition">
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <img src="/assets/Blockchain.png" alt="Blockchain farming illustration" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose FarmBazaar?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our blockchain platform solves the traditional problems of contract farming with transparent, secure, and immutable smart contracts.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Contracts</h3>
              <p className="text-gray-600">Smart contracts that self-execute and cannot be tampered with once deployed.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FileCheck className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Terms</h3>
              <p className="text-gray-600">All contract terms are visible on the blockchain, ensuring complete transparency.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advance Funding</h3>
              <p className="text-gray-600">Farmers receive partial payment upfront to fund crop production and meet expenses.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Coins className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Escrow Protection</h3>
              <p className="text-gray-600">Payments are held in secure escrow until delivery conditions are verified and met.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">How FarmBazaar Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-3">Create Smart Contract</h3>
              <p className="text-gray-600">Buyers create contracts specifying crop type, quantity, quality parameters, pricing, and delivery terms.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-3">Secure Agreement</h3>
              <p className="text-gray-600">Farmers review and accept contracts, receiving advance payment to begin cultivation.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-3">Fulfillment & Payment</h3>
              <p className="text-gray-600">Upon delivery and verification, the smart contract automatically releases the remaining payment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Who Benefits from FarmBazaar?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className={`bg-white p-8 rounded-lg shadow-md border border-gray-200 transition duration-300 ${isHoveredFarmer ? 'shadow-xl transform -translate-y-1' : ''}`}
              onMouseEnter={() => setIsHoveredFarmer(true)}
              onMouseLeave={() => setIsHoveredFarmer(false)}
            >
              <h3 className="text-2xl font-bold mb-4 text-green-700">For Farmers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">✓</span>
                  <span>Secure advance funding before harvest</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">✓</span>
                  <span>Guaranteed buyers for crops before planting</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">✓</span>
                  <span>Protection from price volatility</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">✓</span>
                  <span>Build verifiable reputation on blockchain</span>
                </li>
              </ul>
              <div className="mt-6">
                <a href="/for-farmers" className="text-green-700 font-medium flex items-center hover:text-green-800">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
            
            <div 
              className={`bg-white p-8 rounded-lg shadow-md border border-gray-200 transition duration-300 ${isHoveredBuyer ? 'shadow-xl transform -translate-y-1' : ''}`}
              onMouseEnter={() => setIsHoveredBuyer(true)}
              onMouseLeave={() => setIsHoveredBuyer(false)}
            >
              <h3 className="text-2xl font-bold mb-4 text-green-700">For Buyers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">✓</span>
                  <span>Secure supply of specific quality produce</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">✓</span>
                  <span>Lock in pricing and avoid market fluctuations</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">✓</span>
                  <span>Transparent farming practices and origin tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">✓</span>
                  <span>Direct relationship with verified producers</span>
                </li>
              </ul>
              <div className="mt-6">
                <a href="/for-buyers" className="text-green-700 font-medium flex items-center hover:text-green-800">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Agricultural Commerce?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join FarmBazaar today and experience the future of contract farming powered by blockchain technology.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/connect-wallet" className="bg-white text-green-700 px-8 py-3 rounded-md font-medium hover:bg-green-100 transition">Connect Wallet</a>
            <a href="/marketplace" className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-green-600 transition">Explore Contracts</a>
          </div>
        </div>
      </section>
    </div>
  );
}