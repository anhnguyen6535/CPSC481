import { useState } from "react";
import { useHistory } from "react-router-dom";
import Dialog, { ButtonProps } from "../../components/Dialog/Dialog";

interface BillConfirmProps{
    handleClicked: () => void;
}

const BillConfirm : React.FC<BillConfirmProps> = ({handleClicked}) => { 
    const history = useHistory();
    
    const [confirmOrderBillAlert, setConfirmOrderBillAlert] = useState(true);

    const callWaiterDialogButtons: ButtonProps[] = [
        {
          text: "Call Waiter",
          primary: true,
          onClick: () => {
            setConfirmOrderBillAlert(false);
            history.replace('/bill-requested')
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