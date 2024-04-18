import React from 'react';

const SkeletonLoading = () => {
  return (
    <div className="divide-y divide-gray-200">
      {/* Table header skeleton */}
      <div className="py-3 px-4 flex justify-between items-center bg-gray-50">
        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
      </div>
      {/* Table body skeleton */}
      <div className="animate-pulse py-2 px-4 flex items-center space-x-4 bg-white">
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
      </div>
      <div className="animate-pulse py-2 px-4 flex items-center space-x-4 bg-white">
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
      </div>
      <div className="animate-pulse py-2 px-4 flex items-center space-x-4 bg-white">
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
      </div>
      <div className="animate-pulse py-2 px-4 flex items-center space-x-4 bg-white">
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
      </div>
      <div className="animate-pulse py-2 px-4 flex items-center space-x-4 bg-white">
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
      </div>
      <div className="animate-pulse py-2 px-4 flex items-center space-x-4 bg-white">
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
      </div>
      <div className="animate-pulse py-2 px-4 flex items-center space-x-4 bg-white">
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;

