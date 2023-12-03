import {
  IonButton,
  IonButtons,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import HelpDeskIcon from "../../../assets/HelpIcon.svg";
import { useState } from "react";
import Dialog, { ButtonProps } from "../Dialog/Dialog";
import { arrowBackCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import AlcoholConfirmationDialog from "../AlcoholConfirmationDialog/AlcoholConfirmationDialog";
import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks";
import { selectIsAlcoholDialogOpen } from "../../redux/selectors/alcoholDialogSelectors";
import { closeAlcoholDialog } from "../../redux/actions/alcoholDialogActions";
import CustomButton from "../Custom/CustomeButton/CustomButton";
import styles from "./NavBar.module.scss";

interface NavBarProps {
  pageTitle?: string;
  backButton?: boolean;
}

// includes page title & call waiter button
export default function NavBar(props: NavBarProps) {
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const isAlcoholDialogOpen = useTypedSelector(selectIsAlcoholDialogOpen);
  const [showWaiterCallAlert, setShowWaiterCallAlert] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);

  const handleBackButtonClick = () => {
    history.goBack(); // go back
  };

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

  return (
    <div>
      <div className={styles.customToolbar}>
        <div className={styles.backButtonTitle}>
        {props.backButton && (
          <div style={{marginLeft: "-30px"}}>
            <IonButton
              onClick={handleBackButtonClick}
              fill="clear"
            >
              <IonIcon slot="icon-only" icon={arrowBackCircle}></IonIcon>
            </IonButton>
          </div>
        )}
        <div className={styles.toolbarTitle}>{props.pageTitle}</div>
        </div>
        <div className={styles.toolbarEnd}>
          <CustomButton
            onClick={() => setShowWaiterCallAlert(true)}
            fill="solid"
            color="primary"
            style={{ textTransform: "none", padding: 12 }}
          >
            Call Waiter{" "}
            <IonIcon style={{ marginLeft: 10 }} icon={HelpDeskIcon} />
          </CustomButton>
        </div>
      </div>

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

      <AlcoholConfirmationDialog
        isOpen={isAlcoholDialogOpen}
        onClose={() => dispatch(closeAlcoholDialog())}
      />
    </div>
  );
}
