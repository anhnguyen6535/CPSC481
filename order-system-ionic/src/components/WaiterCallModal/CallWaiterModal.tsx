import { IonButton, IonModal, IonHeader, IonTitle, IonToolbar, IonText, IonContent } from "@ionic/react";
import React from "react";
import './CallWaiterModal.scss'

interface Props {
  isOpen: boolean;
  handleCallWaiter: () => void;
  handleDismiss: () => void;
}

const WaiterNotificationModal: React.FC<Props> = ({ isOpen, handleCallWaiter, handleDismiss }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleDismiss} className="waiter-call-modal">
      <IonContent>
              <IonText>Are you sure you want to call a waiter?</IonText>

          <IonText>
            This will notify a waiter to come to your table.
          </IonText>

          <div className="modal-buttons">
            <IonButton expand="full" color="primary" onClick={handleCallWaiter}>Call Waiter</IonButton>
            <IonButton expand="full" fill="outline" color="primary" onClick={handleDismiss}>Cancel</IonButton>
          </div>
      </IonContent>
    </IonModal>
  );
};

export default WaiterNotificationModal;