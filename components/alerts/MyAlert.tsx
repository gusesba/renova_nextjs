import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Alert } from 'react-bootstrap';
import AlertContext from '../../contexts/AlertContext';

export interface IMyAlert {}

const MyAlert: React.FC<IMyAlert> = () => {
  const { alerts } = useContext(AlertContext) as {
    alerts: { variant: string; message: string }[];
    setAlerts: Dispatch<SetStateAction<{ variant: string; message: string }[]>>;
  };
  return (
    <div className="w-[15rem] absolute bottom-1 left-2">
      {alerts.map((alert, index) => {
        return (
          <Alert key={index} variant={alert.variant}>
            {alert.message}
          </Alert>
        );
      })}
    </div>
  );
};

export default MyAlert;
