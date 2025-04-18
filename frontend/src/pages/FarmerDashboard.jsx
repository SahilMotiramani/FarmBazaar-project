import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Package, DollarSign, FileText, Edit, Trash2 } from 'lucide-react';

export default function FarmerDashboardPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/contracts', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setContracts(data.contracts);
        } else {
          throw new Error('Failed to fetch contracts');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContracts();
  }, []);

  const handleDelete = async (contractId) => {
    if (!window.confirm('Are you sure you want to delete this contract?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/v1/contracts/${contractId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        setContracts(prev => prev.filter(contract => contract._id !== contractId));
      } else {
        throw new Error('Failed to delete contract');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete contract');
    }
  };

  if (loading) {
    return (
      <div className="py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4">Loading your contracts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg inline-block">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">Your Contracts</h1>
        <Link 
          to="/add-listing"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium flex items-center"
        >
          <Plus className="mr-2" size={18} />
          Add New Listing
        </Link>
      </div>
      
      {contracts.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't created any contracts yet.</p>
          <Link 
            to="/add-listing"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium inline-flex items-center"
          >
            <Plus className="mr-2" size={18} />
            Create Your First Contract
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map(contract => (
            <div key={contract._id} className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-green-700">{contract.cropName}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {contract.status || 'Active'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{contract.cropVariety} • {contract.cropCategory}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="mr-2" size={16} />
                    {contract.quantity} {contract.quantityUnit} available
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2" size={16} />
                    Harvest: {new Date(contract.expectedYieldDate).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2" size={16} />
                    {contract.village}, {contract.district}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="mr-2" size={16} />
                    ₹{contract.expectedPrice} per {contract.quantityUnit}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-2" size={16} />
                    Contract duration: {contract.contractDuration}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                <Link 
                  to={`/contracts/${contract._id}`}
                  className="text-green-600 hover:text-green-800 flex items-center text-sm font-medium"
                >
                  <FileText className="mr-1" size={16} />
                  View Details
                </Link>
                
                <div className="flex space-x-2">
                  <Link 
                    to={`/edit-contract/${contract._id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                  >
                    <Edit className="mr-1" size={16} />
                    Edit
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(contract._id)}
                    className="text-red-600 hover:text-red-800 flex items-center text-sm font-medium"
                  >
                    <Trash2 className="mr-1" size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}