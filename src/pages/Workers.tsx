import React, { useState } from 'react';
import { workers, serviceIcons } from '../data';
import WorkerCard from '../components/ui/WorkerCard';
import { Filter, Search, MapPin } from 'lucide-react';
import { ServiceCategory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const Workers: React.FC = () => {
  const [filters, setFilters] = useState<{
    availability: string;
    skills: ServiceCategory[];
    location: string;
    search: string;
  }>({
    availability: 'all',
    skills: [],
    location: '',
    search: '',
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleSkill = (skill: ServiceCategory) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };
  
  const handleAvailabilityChange = (availability: string) => {
    setFilters(prev => ({ ...prev, availability }));
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, location: e.target.value }));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  const filteredWorkers = workers.filter(worker => {
    // Filter by availability
    if (filters.availability !== 'all') {
      if (filters.availability === 'available' && worker.availability !== 'Available Today') return false;
      if (filters.availability === 'booked' && worker.availability !== 'Booked Until 2PM') return false;
      if (filters.availability === 'unavailable' && worker.availability !== 'Unavailable') return false;
    }
    
    // Filter by skills
    if (filters.skills.length > 0) {
      if (!worker.skills.some(skill => filters.skills.includes(skill))) return false;
    }
    
    // Filter by location
    if (filters.location && !worker.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Filter by search term
    if (filters.search && !worker.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div>
      {/* Page Header */}
      <div className="bg-teal-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Our Professional Cleaners</h1>
          <p className="max-w-2xl mx-auto">
            Meet our team of experienced, trusted, and highly-rated cleaning professionals available for booking.
          </p>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={filters.search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            {/* Filter Toggle Button (Mobile) */}
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filters {showFilters ? '(Hide)' : '(Show)'}</span>
            </button>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4">
              {/* Location filter */}
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by location..."
                  value={filters.location}
                  onChange={handleLocationChange}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              {/* Availability filter */}
              <select
                value={filters.availability}
                onChange={(e) => handleAvailabilityChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">All Availability</option>
                <option value="available">Available Today</option>
                <option value="booked">Booked Until Later</option>
                <option value="unavailable">Not Available</option>
              </select>
            </div>
          </div>
          
          {/* Mobile Filters (Expandable) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 md:hidden overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Location filter (Mobile) */}
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Filter by location..."
                      value={filters.location}
                      onChange={handleLocationChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Availability filter (Mobile) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <select
                      value={filters.availability}
                      onChange={(e) => handleAvailabilityChange(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="all">All Availability</option>
                      <option value="available">Available Today</option>
                      <option value="booked">Booked Until Later</option>
                      <option value="unavailable">Not Available</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Skills filter (both desktop and mobile) */}
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(serviceIcons).map(([key, Icon]) => (
              <button
                key={key}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  filters.skills.includes(key as ServiceCategory)
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => toggleSkill(key as ServiceCategory)}
              >
                <Icon size={14} />
                <span className="capitalize">{key}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Workers Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredWorkers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWorkers.map(worker => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No cleaners found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Workers;