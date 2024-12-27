import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { ToastContext } from '../../context/ToastContext';

function Toast() {
  const { toast, toastType } = useContext(ToastContext);
  return (
    <Snackbar open={!!toast} autoHideDuration={6000}>
      <Alert severity={toastType} variant="filled" sx={{ width: '100%' }}>
        {toast}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
