import React from 'react';
import styles from './Dialog.module.scss';
import { IonButton } from '@ionic/react';


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

const Dialog: React.FC<DialogProps> = ({ title, content, buttons, isOpen, onDismiss }) => {
  if (!isOpen) {
    return null;
  }

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLDivElement).id === 'dialogOverlay') {
      onDismiss();
    }
  };

  return (
    <div id='dialogOverlay' className={styles.dialogOverlay} onClick={handleClickOutside}>
      <div className={styles.dialog}>
        <h2 className={styles.dialogTitle}>{title}</h2>
        <p className={styles.dialogContent}>{content}</p>
        <div className={styles.buttonGroup}>
        {buttons.map((button, index) =>
            button.primary ? (
              <IonButton key={index} onClick={button.onClick} fill="solid" color="primary"  style={{ marginBottom: '3px' }}>
                {button.text}
              </IonButton>
            ) : (
            <IonButton key={index} onClick={button.onClick} fill="outline" color="primary">
                {button.text}
              </IonButton>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;