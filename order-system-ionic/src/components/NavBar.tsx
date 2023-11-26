import { IonButton, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import HelpDeskIcon from "../../assets/HelpIcon.svg";
import { useState } from "react";
import Dialog, { ButtonProps } from "./Dialog/Dialog";

<<<<<<< HEAD
// includes page title & call waiter button
export default function NavBar(props: NavBarProps) {
=======

export default function NavBar() {
>>>>>>> f630f90 (onclick and persisit reduc state)
    const [showWaiterCallAlert, setShowWaiterCallAlert] = useState(false);
    const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);

    const callWaiterDialogButtons: ButtonProps[] = [
        {
            text: "Call Waiter",
            primary: true,
            onClick: () => {
            setShowWaiterCallAlert(false);
            setShowConfirmationAlert(true);
            },
        },
        {
            text: "Cancel",
            primary: false,
            onClick: () => {
            setShowWaiterCallAlert(false);
            },
        },
    ];

    const waiterConfirmationButtons: ButtonProps[] = [
        {
          text: "Okay",
          primary: false,
          onClick: () => {
            setShowConfirmationAlert(false);
          },
        },
    ];
    
    return(
        <div>
            <IonToolbar>
<<<<<<< HEAD
              <IonTitle className="ion-text-left">{props.pageTitle}</IonTitle>
=======
              <IonTitle className="ion-text-left">Flavour of Calgary</IonTitle>
>>>>>>> f630f90 (onclick and persisit reduc state)
              <IonButton
                onClick={() => setShowWaiterCallAlert(true)}
                fill="solid"
                color="primary"
                slot="end"
                style={{ textTransform: "none" }}
              >
                Call Waiter{" "}
                <IonIcon style={{ marginLeft: 10 }} icon={HelpDeskIcon} />
              </IonButton>
            </IonToolbar>
            
            <Dialog
            title="Are you sure you want to call a waiter?"
            content="This will notify a waiter to come to your table."
            buttons={callWaiterDialogButtons}
            isOpen={showWaiterCallAlert}
            onDismiss={() => setShowWaiterCallAlert(false)}
          />
    
          <Dialog
            title="Waiter called!"
            content="A waiter has been notified and will be with you shortly."
            buttons={waiterConfirmationButtons}
            isOpen={showConfirmationAlert}
            onDismiss={() => setShowConfirmationAlert(false)}
          />
        </div>
    )
<<<<<<< HEAD
}

interface NavBarProps{
  pageTitle?: string;
=======
>>>>>>> f630f90 (onclick and persisit reduc state)
}