import React, { createContext, useContext, useState } from 'react';
import Snackbar from './Snackbar';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' ,color:'green'}); 

  const showSnackbar = (message,color) => {
    setSnackbar({ visible: true, message ,color});
    setTimeout(() => setSnackbar({ visible: false, message: '' }), 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.visible && (
        <Snackbar message={snackbar.message} color={snackbar.color?snackbar.color:'green'}  onClose={() => setSnackbar({ visible: false, message: '' })} />
      )}
    </SnackbarContext.Provider>
  );
};
