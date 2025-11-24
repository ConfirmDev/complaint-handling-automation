import { useState } from 'react';
import { Search, Filter, Phone, Mail, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Contractor {
  id: string;
  name: string;
  company: string;
  specialization: string[];
  phone: string;
  email: string;
  location: string;
  availability: 'available' | 'busy' | 'unavailable';
  rating: number;
  completedJobs: number;
  avatar: string;
}

export function ContractorList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const contractors: Contractor[] = [
    {
      id: '1',
      name: 'Ahmad bin Hassan',
      company: 'Elite Electrical Services',
      specialization: ['Electrical'],
      phone: '+60 12-345 6789',
      email: 'ahmad@eliteelectric.com',
      location: 'Kuala Lumpur',
      availability: 'available',
      rating: 4.8,
      completedJobs: 234,
      avatar: 'AH',
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      company: 'AirCool Solutions',
      specialization: ['Air Conditioning'],
      phone: '+60 13-456 7890',
      email: 'siti@aircool.com',
      location: 'Petaling Jaya',
      availability: 'available',
      rating: 4.9,
      completedJobs: 312,
      avatar: 'SN',
    },
    {
      id: '3',
      name: 'Lee Chong Wei',
      company: 'Master Plumbing',
      specialization: ['Plumbing'],
      phone: '+60 14-567 8901',
      email: 'lee@masterplumbing.com',
      location: 'Shah Alam',
      availability: 'busy',
      rating: 4.7,
      completedJobs: 189,
      avatar: 'LW',
    },
    {
      id: '4',
      name: 'Raj Kumar',
      company: 'Woodcraft Carpentry',
      specialization: ['Carpentry'],
      phone: '+60 15-678 9012',
      email: 'raj@woodcraft.com',
      location: 'Subang Jaya',
      availability: 'available',
      rating: 4.6,
      completedJobs: 156,
      avatar: 'RK',
    },
    {
      id: '5',
      name: 'Chen Wei Ming',
      company: 'Vertical Solutions',
      specialization: ['Elevator'],
      phone: '+60 16-789 0123',
      email: 'chen@verticalsolutions.com',
      location: 'Kuala Lumpur',
      availability: 'available',
      rating: 4.9,
      completedJobs: 98,
      avatar: 'CW',
    },
    {
      id: '6',
      name: 'Fatimah Zahra',
      company: 'SparkFix Electrical',
      specialization: ['Electrical'],
      phone: '+60 17-890 1234',
      email: 'fatimah@sparkfix.com',
      location: 'Cyberjaya',
      availability: 'unavailable',
      rating: 4.5,
      completedJobs: 201,
      avatar: 'FZ',
    },
    {
      id: '7',
      name: 'Kumar Selvam',
      company: 'FlowMaster Plumbing',
      specialization: ['Plumbing'],
      phone: '+60 18-901 2345',
      email: 'kumar@flowmaster.com',
      location: 'Puchong',
      availability: 'available',
      rating: 4.7,
      completedJobs: 267,
      avatar: 'KS',
    },
    {
      id: '8',
      name: 'Nurul Aina',
      company: 'CoolBreeze HVAC',
      specialization: ['Air Conditioning'],
      phone: '+60 19-012 3456',
      email: 'nurul@coolbreeze.com',
      location: 'Selangor',
      availability: 'busy',
      rating: 4.8,
      completedJobs: 178,
      avatar: 'NA',
    },
    {
      id: '9',
      name: 'David Tan',
      company: 'Multi-Fix Services',
      specialization: ['Electrical', 'Plumbing', 'Carpentry'],
      phone: '+60 11-123 4567',
      email: 'david@multifix.com',
      location: 'Kuala Lumpur',
      availability: 'available',
      rating: 4.9,
      completedJobs: 423,
      avatar: 'DT',
    },
    {
      id: '10',
      name: 'Zainab Mohamed',
      company: 'CleanSpace Solutions',
      specialization: ['Cleaning/Sanitation'],
      phone: '+60 12-234 5678',
      email: 'zainab@cleanspace.com',
      location: 'Mont Kiara',
      availability: 'available',
      rating: 4.6,
      completedJobs: 289,
      avatar: 'ZM',
    },
  ];

  const getAvailabilityColor = (availability: Contractor['availability']) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'busy':
        return 'bg-yellow-100 text-yellow-700';
      case 'unavailable':
        return 'bg-red-100 text-red-700';
    }
  };

  const getAvailabilityIcon = (availability: Contractor['availability']) => {
    switch (availability) {
      case 'available':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'busy':
      case 'unavailable':
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch =
      contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.specialization.some((spec) =>
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      categoryFilter === 'all' ||
      contractor.specialization.some((spec) =>
        spec.toLowerCase().includes(categoryFilter.toLowerCase())
      );

    const matchesAvailability =
      availabilityFilter === 'all' || contractor.availability === availabilityFilter;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-green-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-teal-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Contractor Directory</h1>
        <p className="text-gray-500">Browse and manage facility contractors</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contractors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="carpentry">Carpentry</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="air conditioning">Air Conditioning</SelectItem>
              <SelectItem value="elevator">Elevator</SelectItem>
              <SelectItem value="cleaning">Cleaning/Sanitation</SelectItem>
            </SelectContent>
          </Select>

          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Availability</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredContractors.length} of {contractors.length} contractors
        </p>
      </div>

      {/* Contractor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContractors.map((contractor, index) => (
          <div
            key={contractor.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            {/* Header with Avatar and Availability */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${getAvatarColor(
                    index
                  )} flex items-center justify-center text-white`}
                >
                  {contractor.avatar}
                </div>
                <div>
                  <h3 className="text-gray-900">{contractor.name}</h3>
                  <p className="text-gray-500 text-sm">{contractor.company}</p>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="mb-4">
              <Badge className={`${getAvailabilityColor(contractor.availability)} flex items-center gap-1 w-fit`}>
                {getAvailabilityIcon(contractor.availability)}
                {contractor.availability}
              </Badge>
            </div>

            {/* Specialization */}
            <div className="mb-4">
              <div className="text-gray-600 text-sm mb-2">Specialization:</div>
              <div className="flex flex-wrap gap-2">
                {contractor.specialization.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                {contractor.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                {contractor.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                {contractor.location}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <div className="text-gray-900">⭐ {contractor.rating}</div>
                <div className="text-gray-500 text-xs">Rating</div>
              </div>
              <div className="text-right">
                <div className="text-gray-900">{contractor.completedJobs}</div>
                <div className="text-gray-500 text-xs">Jobs Completed</div>
              </div>
            </div>

            {/* Action Button */}
            <button
              className={`w-full mt-4 py-2 rounded-lg transition-colors ${
                contractor.availability === 'available'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={contractor.availability !== 'available'}
            >
              {contractor.availability === 'available' ? 'Assign Job' : 'Not Available'}
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContractors.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-2">
            <Filter className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-600">No contractors found matching your filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setAvailabilityFilter('all');
            }}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
