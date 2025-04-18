import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Package, DollarSign, Truck, Clock, Users, FileText, AlertCircle } from 'lucide-react';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactFormVisible, setContactFormVisible] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/contracts/${id}`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setListing(data.contract);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch listing details');
        }
      } catch (error) {
        console.error('Error fetching listing details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchListingDetails();
  }, [id]);

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Here you would implement the logic to send the contact request
    // For now, just show a success message
    alert('Your contact request has been sent to the farmer!');
    setContactFormVisible(false);
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  if (loading) {
    return (
      <div className="py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4">Loading listing details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg inline-block">
          <p>Error: {error}</p>
          <button 
            onClick={() => navigate('/marketplace')} 
            className="mt-2 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg inline-block">
          <p>Listing not found</p>
          <button 
            onClick={() => navigate('/marketplace')} 
            className="mt-2 bg-yellow-600 text-white px-4 py-1 rounded-md hover:bg-yellow-700"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* Back button */}
      <button 
        onClick={() => navigate('/marketplace')}
        className="mb-6 text-green-700 hover:underline flex items-center"
      >
        ← Back to Marketplace
      </button>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Left column - Images and main details */}
          <div className="lg:col-span-2 p-6 lg:border-r border-gray-200">
            {/* Image gallery - placeholder for now */}
            <div className="mb-6 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              {listing.images && listing.images.length > 0 ? (
                <img 
                  src={`http://localhost:3000/${listing.images[0]}`} 
                  alt={listing.cropName}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">No images available</span>
              )}
            </div>
            
            {/* Header with status */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-green-700">{listing.cropName}</h1>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {listing.status}
              </span>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              {listing.cropVariety} • {listing.cropCategory}
            </p>
            
            {/* Key details in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Package className="mr-2 text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Quantity Available</p>
                    <p className="font-medium">{listing.quantity} {listing.quantityUnit}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="mr-2 text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Expected Harvest</p>
                    <p className="font-medium">{new Date(listing.expectedYieldDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="mr-2 text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Sowing Date</p>
                    <p className="font-medium">
                      {listing.sowingDate ? new Date(listing.sowingDate).toLocaleDateString() : 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <DollarSign className="mr-2 text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Expected Price</p>
                    <p className="font-medium">₹{listing.expectedPrice} per {listing.quantityUnit}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="mr-2 text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Minimum Price</p>
                    <p className="font-medium">₹{listing.minPrice} per {listing.quantityUnit}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="mr-2 text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{listing.village}, {listing.district}, {listing.state}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Farm Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{listing.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pin Code</p>
                  <p>{listing.pinCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Farm Area</p>
                  <p>{listing.farmArea} {listing.areaUnit}</p>
                </div>
              </div>
            </div>
            
            {/* Contract terms */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Contract Terms</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="mr-2 text-green-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Contract Duration</p>
                    <p>{listing.contractDuration}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Truck className="mr-2 text-green-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Delivery Responsibility</p>
                    <p>{listing.deliveryResponsibility}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="mr-2 text-green-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Delivery Location</p>
                    <p>{listing.deliveryLocation}</p>
                  </div>
                </div>
                
                {listing.penaltyClauses && (
                  <div className="flex items-start">
                    <AlertCircle className="mr-2 text-green-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Penalty Clauses</p>
                      <p>{listing.penaltyClauses}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <Users className="mr-2 text-green-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Preferred Buyer Type</p>
                    <p>{listing.preferredBuyerType}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileText className="mr-2 text-green-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Payment Mode</p>
                    <p>{listing.paymentMode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Action panel */}
          <div className="p-6 bg-gray-50">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-green-700 mb-4">Interest & Negotiation</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Price:</span>
                    <span className="font-semibold">₹{listing.expectedPrice}/{listing.quantityUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Price:</span>
                    <span className="font-semibold">₹{listing.minPrice}/{listing.quantityUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Advance Required:</span>
                    <span className="font-semibold">
                      {listing.requiresAdvance ? `Yes (₹${listing.advanceAmount})` : 'No'}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setContactFormVisible(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium"
                >
                  Contact Farmer
                </button>
              </div>
              
              {/* Farm details summary */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-3">Listing Summary</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed On:</span>
                    <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listing ID:</span>
                    <span className="font-mono">{listing._id.substring(0, 8)}...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      {contactFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Farmer</h2>
            
            <form onSubmit={handleContactSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setContactFormVisible(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}