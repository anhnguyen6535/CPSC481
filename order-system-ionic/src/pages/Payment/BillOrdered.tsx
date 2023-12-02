import { useState } from "react";
import Dialog, { ButtonProps } from "../../components/Dialog/Dialog";

interface BillOrderedProps{
    handleClicked: () => void;
}

const BillOrdered : React.FC<BillOrderedProps> = ({handleClicked}) => { 

    const [confirmOrderBillAlert, setConfirmOrderBillAlert] = useState(true);
    const [confirmed, setConfirmed] = useState(false);

    const callWaiterDialogButtons: ButtonProps[] = [
        {
          text: "Call Waiter",
          primary: true,
          onClick: () => {
            setConfirmed(true);
            setConfirmOrderBillAlert(false);
          },
        },
        {
          text: "Cancel",
          primary: false,
          onClick: () => handleClicked()
        },
      ];
    return(
        <>
            <Dialog
                title="Are you sure you want to order the bill?"
                content="This will notify a waiter to come to your table."
                buttons={callWaiterDialogButtons}
                isOpen={confirmOrderBillAlert}
                onDismiss={() => handleClicked()}
            />

            <Dialog
                title="Bill Ordered!"
                content="A waiter has been notified and will bring the bill to you shortly."
                isOpen={confirmed}
            />
        </>
    )
 }

 export default BillOrdered;