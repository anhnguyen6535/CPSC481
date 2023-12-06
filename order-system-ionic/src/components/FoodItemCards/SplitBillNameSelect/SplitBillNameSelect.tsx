import React, { useState } from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { Diner } from "../../../redux/reducers/billReducer";
import styles from "./SplitBillNameSelect.module.scss";

interface NameSelectProps {
  diners: Diner[];
}

function truncate(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "..";
}

const mapNamesToSelectOptions = (diners: Diner[]) => {
  return diners.map((diner, index) => (
    <IonSelectOption key={index} value={index}>
      {truncate(diner.name, 15)}
    </IonSelectOption>
  ));
};

const SplitBillNameSelect: React.FC<NameSelectProps> = ({ diners }) => {
  const [selectedDiners, setSelectedDiners] = useState<number[]>([]);

  const handleSelectionChange = (event: CustomEvent) => {
    const selectedValues = event.detail.value as number[];
    setSelectedDiners(selectedValues);
  };

  const selectedDinerNames = selectedDiners
    .map((index) => diners[index].name)
    .join(", ");

  return (
    <IonList
      inset={true}
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      <IonItem className={styles.select}>
        <IonSelect
          shape="round"
          placeholder="Split"
          multiple={true}
          interface="popover"
          selectedText={truncate(selectedDinerNames, 7)}
          onIonChange={handleSelectionChange}
          value={selectedDiners}
        >
          {mapNamesToSelectOptions(diners)}
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default SplitBillNameSelect;
