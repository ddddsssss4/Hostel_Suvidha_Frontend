import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-4 aspect-square rounded-full animate-bounceLoader"></div>
    </div>
  );
};

export default Spinner;
