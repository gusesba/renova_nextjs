import { createContext, Dispatch, SetStateAction } from 'react';

const AlertContext = createContext<{
  alerts: { variant: string; message: string }[];
  setAlerts: Dispatch<SetStateAction<{ variant: string; message: string }[]>>;
} | null>(null);

export default AlertContext;
