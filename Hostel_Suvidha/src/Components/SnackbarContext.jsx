import React, { createContext, useContext, useState } from 'react';
import Snackbar from './Snackbar';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  const showSnackbar = (message) => {
    setSnackbar({ visible: true, message });
    setTimeout(() => setSnackbar({ visible: false, message: '' }), 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.visible && (
        <Snackbar message={snackbar.message} onClose={() => setSnackbar({ visible: false, message: '' })} />
      )}
    </SnackbarContext.Provider>
  );
};
