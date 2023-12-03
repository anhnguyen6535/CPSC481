import React, { useEffect, useState } from "react";
import { IonButton, IonPopover } from "@ionic/react";
import styles from "./Dialog.module.scss";

export interface ButtonProps {
  text: string;
  primary: boolean;
  onClick: () => void;
}

export interface DialogProps {
  title: string;
  content: string;
  buttons: ButtonProps[];
  isOpen: boolean;
  onDismiss: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  content,
  buttons,
  isOpen,
  onDismiss,
}) => {
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    if (isOpen) setRendered(true);
    else setRendered(false);
  }, [isOpen]);

  const dialogContent = (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 className={styles.dialogTitle}>{title}</h2>
      <p className={styles.dialogContent}>{content}</p>
      <div className={styles.buttonGroup}>
        {buttons.map((button, index) =>
          button.primary ? (
            <IonButton
              key={index}
              onClick={button.onClick}
              fill="solid"
              color="primary"
              style={{ marginBottom: "3px" }}
            >
              {button.text}
            </IonButton>
          ) : (
            <IonButton
              key={index}
              onClick={button.onClick}
              fill="outline"
              color="primary"
            >
              {button.text}
            </IonButton>
          )
        )}
      </div>
    </div>
  );
  return (
    <div>
      {isRendered && (
        <IonPopover
          isOpen={isOpen}
          onDidDismiss={onDismiss}
          style={{ "--min-width": "300px" }}
        >
          {dialogContent}
        </IonPopover>
      )}
    </div>
  );
};

export default Dialog;
