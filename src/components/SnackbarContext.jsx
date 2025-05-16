import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomSnackbar from './CustomSnackbar';

const SnackbarContext = createContext({
  openSnackbar: (message, severity, anchorOrigin) => {}
});

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    anchorOrigin: { vertical: 'top', horizontal: 'center' }
  });

  const openSnackbar = useCallback((message, severity = 'success', anchorOrigin) => {
    setSnackbar({
      open: true,
      message,
      severity,
      anchorOrigin: anchorOrigin || { vertical: 'top', horizontal: 'center' }
    });
  }, []);

  const handleClose = useCallback(() => {
    setSnackbar(s => ({ ...s, open: false }));
  }, []);

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        anchorOrigin={snackbar.anchorOrigin}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context.openSnackbar;
};
