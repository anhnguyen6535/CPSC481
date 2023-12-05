import styles from "./Empty.module.scss";
import { IonButton } from "@ionic/react";

interface EmptyHandlerProps {
  content: string;
  image: string;
  buttonTitle: string;
  buttonAction: React.MouseEventHandler<HTMLIonButtonElement> | undefined;
}

const EmptyHandler: React.FC<EmptyHandlerProps> = ({
  content,
  image,
  buttonTitle,
  buttonAction,
}) => {
  return (
    <div className={styles.noCartItems}>
      <div>
        <div>
          <img
            src={image}
            alt="${content} is empty"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <p>There are no items in your {content}.</p>
      </div>
      <IonButton onClick={buttonAction} className={styles.noCartItemsButton}>
        {buttonTitle}
      </IonButton>
    </div>
  );
};

export default EmptyHandler;
