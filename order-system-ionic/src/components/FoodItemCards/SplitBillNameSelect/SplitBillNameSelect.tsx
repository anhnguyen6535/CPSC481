import React, { useState } from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { Diner } from "../../../redux/reducers/billReducer";
import styles from "./SplitBillNameSelect.module.scss";
import { useTypedSelector, useTypedDispatch } from "../../../hooks/reduxHooks";
import { selectSplitBillDiners } from "../../../redux/selectors/billSelectors";
import {
  selectPerson,
  deselectPerson,
} from "../../../redux/actions/billActions";

interface NameSelectProps {
  diners: Diner[];
  itemId: number;
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

const SplitBillNameSelect: React.FC<NameSelectProps> = ({ diners, itemId }) => {
  const dinersList = useTypedSelector(selectSplitBillDiners);
  const dispatch = useTypedDispatch();

  const [selectedDiners, setSelectedDiners] = useState<number[]>(
    diners.map((diner) => diner.index)
  );

  const handleSelectionChange = (event: CustomEvent) => {
    const selectedValues = event.detail.value as number[];

    const deselectedPersons = selectedDiners.filter(
      (index) => !selectedValues.includes(index)
    );

    deselectedPersons.forEach((index) => {
      dispatch(deselectPerson(itemId, dinersList[index]));
    });


    const selectedPersons = selectedValues.filter((index) => !selectedDiners.includes(index));

    selectedPersons.forEach((index) => {
      dispatch(selectPerson(itemId, dinersList[index]));
    });

    setSelectedDiners(selectedValues);
  };

  const selectedDinerNames = selectedDiners
    .map((index) => dinersList[index].name)
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
          {mapNamesToSelectOptions(dinersList)}
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default SplitBillNameSelect;
