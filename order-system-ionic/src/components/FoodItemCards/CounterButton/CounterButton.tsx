import React, { useState } from "react";
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
  const [values, setValues] = useState({
    count: amount,
    showTrash: amount !== 0 && enableTrash,
    showAdd: enableAdd && amount === 0,
  });

  const resetAmount = () => {
    setValues({
      count: 0,
      showAdd: enableAdd,
      showTrash: false && enableTrash,
    });
  };

  const decrement = (
    event:
      | React.MouseEvent<HTMLIonIconElement, MouseEvent>
      | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (values["count"] > 1) {
      setValues({
        count: values["count"] - 1,
        showAdd: values["showAdd"],
        showTrash: values["showTrash"] && enableTrash,
      });
    } else if (values["count"] === 1) {
      setValues({
        count: 0,
        showAdd: enableAdd,
        showTrash: false && enableTrash,
      });
    }

    onRemove && onRemove();
    event.stopPropagation();
  };

  const increment = (
    event:
      | React.MouseEvent<HTMLIonIconElement, MouseEvent>
      | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setValues({
      count: values["count"] + 1,
      showAdd: false,
      showTrash: true && enableTrash,
    });

    onAdd && onAdd();
    event.stopPropagation();
  };

  return (
    <div className={styles.counterButtonContainer}>
      <IonIcon
        icon={trash}
        onClick={() => resetAmount()}
        className={`${styles.icon} ${
          values["showTrash"] ? styles.visible : styles.hidden
        }`}
      />
      <IonButton
        color="primary"
        shape="round"
        fill="outline"
        size="small"
        onClick={(event) => increment(event)}
        className={`${styles.button} ${
          values["showAdd"] ? styles.visible : styles.hidden
        }`}
      >
        Add
      </IonButton>
      <div
        className={`${styles.counterDisplay} ${
          values["showAdd"] ? styles.hidden : styles.visible
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
            color="dark"
            icon={remove}
            onClick={(event) => decrement(event)}
            style={{ marginRight: "0.5rem" }}
          />
          <IonText color="primary" className={styles.count}>
            {values["count"]}
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
