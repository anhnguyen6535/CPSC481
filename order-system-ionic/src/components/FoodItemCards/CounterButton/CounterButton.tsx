import React, { useEffect, useState } from "react";
import { IonButton, IonIcon, IonText } from "@ionic/react";
import { remove, add, trash } from "ionicons/icons";
import styles from "./CounterButton.module.scss";

interface CounterButtonProps {
  amount: number;
  enableTrash?: boolean | false;
  showTrashIcon?: boolean | false;
  onAdd?: () => void;
  onRemove?: () => void;
  enableAdd: boolean;
}

const CounterButton: React.FC<CounterButtonProps> = ({
  amount,
  enableTrash,
  onAdd,
  onRemove,
  enableAdd,
}) => {
  const [count, setCount] = useState(amount);
  const [showTrash, setShowTrash] = useState(amount !== 0 && enableTrash);
  const [showAdd, setShowAdd] = useState(enableAdd && amount === 0);

  const resetAmount = () => {
    setCount(0);
    setShowAdd(enableAdd);
    setShowTrash(false && enableTrash);
  };

  const decrement = (
    event:
      | React.MouseEvent<HTMLIonIconElement, MouseEvent>
      | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (count > 1) {
      setCount(count - 1);
      setShowAdd(showAdd);
      setShowTrash(showTrash && enableTrash);
    } else if (count === 1) {
      setCount(enableAdd ? 0 : 1);
      setShowAdd(enableAdd);
      setShowTrash(false && enableTrash);
    }

    onRemove && onRemove();
    event.stopPropagation();
  };

  const increment = (
    event:
      | React.MouseEvent<HTMLIonIconElement, MouseEvent>
      | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setCount(count + 1);
    setShowAdd(false);
    setShowTrash(true && enableTrash);

    onAdd && onAdd();
    event.stopPropagation();
  };

  useEffect(() => {
    setCount(amount);
    setShowAdd(enableAdd && amount === 0);
  }, [amount]);

  return (
    <div className={styles.counterButtonContainer}>
      <IonIcon
        icon={trash}
        onClick={() => resetAmount()}
        className={`${styles.icon} ${
          showTrash ? styles.visible : styles.hidden
        }`}
      />
      <IonButton
        color="primary"
        shape="round"
        fill="outline"
        size="small"
        onClick={(event) => increment(event)}
        className={`${styles.button} ${
          showAdd ? styles.visible : styles.hidden
        }`}
      >
        Add
      </IonButton>
      <div
        className={`${styles.counterDisplay} ${
          showAdd ? styles.hidden : styles.visible
        }`}
      >
        <div
          style={{
            borderRadius: 10,
            backgroundColor: "#DADADA",
            padding: "0px 10px 0px 10px",
          }}
        >
          <IonIcon
            color={(!enableAdd && count > 1) || enableAdd ? "dark" : "medium"}
            icon={remove}
            onClick={(event) => decrement(event)}
            style={{
              marginRight: "0.5rem",
              opacity: (!enableAdd && count > 1) || enableAdd ? 1 : 0.5,
              cursor:
                (!enableAdd && count > 1) || enableAdd
                  ? "pointer"
                  : "not-allowed",
            }}
          />
          <IonText color="primary" className={styles.count}>
            {count}
          </IonText>
          <IonIcon
            color="dark"
            icon={add}
            onClick={(event) => increment(event)}
            style={{ marginLeft: "0.5rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CounterButton;
