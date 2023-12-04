import React from 'react';
import { useTypedSelector } from '../hooks/reduxHooks';
import { selectIsBillOrdered } from '../redux/selectors/billSelectors';
import Dialog from './Dialog/Dialog';

interface BillNotiWrapperProps {
  children: React.ReactNode;
}

const BillNotiWrapper: React.FC<BillNotiWrapperProps> = ({ children }) => {
  const isBillOrdered = useTypedSelector(selectIsBillOrdered);

  return (
    <>
      {children}
      {isBillOrdered && (
        <Dialog
          title="Bill Ordered!"
          content="A waiter has been notified and will bring the bill to you shortly."
          isOpen={isBillOrdered}
          backdropDismiss={false}
        />
      )}
    </>
  );
};

export default BillNotiWrapper;
