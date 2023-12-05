import { useState } from "react";
import { useDispatch } from "react-redux";
import Dialog, { ButtonProps } from "../../components/Dialog/Dialog";
import { orderBill } from "../../redux/actions/billActions";

interface BillConfirmProps{
    handleClicked: () => void;
}

const BillConfirm : React.FC<BillConfirmProps> = ({handleClicked}) => { 
    const dispatch = useDispatch();
    
    const [confirmOrderBillAlert, setConfirmOrderBillAlert] = useState(true);
    const [confirmed, setConfirmed] = useState(false);

    const callWaiterDialogButtons: ButtonProps[] = [
        {
          text: "Call Waiter",
          primary: true,
          onClick: () => {
            setConfirmed(true);
            setConfirmOrderBillAlert(false);
            dispatch(orderBill());
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
        </>
    )
 }

 export default BillConfirm;