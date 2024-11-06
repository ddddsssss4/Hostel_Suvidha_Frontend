import React, { useEffect, useState } from 'react';

const Snackbar = ({ message, onClose, duration = 3000,color }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Delay to allow for exit transition
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed z-20 bottom-4 right-4 transition-transform transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } bg-${color}-400 text-white px-4 py-2 rounded shadow-lg`}
      style={{ transition: 'transform 0.5s ease, opacity 0.5s ease' }}
    >
      {message}
    </div>
  );
};

export default Snackbar;
