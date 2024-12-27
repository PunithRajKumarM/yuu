import { createContext, ReactNode, useMemo, useState } from 'react';
import { IToastContext } from '../interfaces/interfaces';
import { TToastType } from '../types/types';

export const ToastContext = createContext<IToastContext>({
  toast: '',
  toastType: 'success',
  updateToast: () => {},
});

export default function ToastContextProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<string>('');
  const [toastType, setToastType] = useState<TToastType>('success');

  const updateToast = (message: string, type?: TToastType) => {
    setToast(message);
    if (type) {
      setToastType(type);
    }
  };

  const value = useMemo(
    () => ({
      toast,
      toastType,
      updateToast,
    }),
    [toast, toastType]
  );
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
