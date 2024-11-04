import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#7380EC] rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
