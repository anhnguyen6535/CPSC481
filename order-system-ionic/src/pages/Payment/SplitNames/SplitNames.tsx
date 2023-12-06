import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/reduxHooks";
import styles from "./SplitNames.module.scss";
import { addDiner, removeDiner } from "../../../redux/actions/billActions";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import { addCircleOutline, trashOutline } from "ionicons/icons";
import Layout from "../../../components/Layout";
import { selectSplitBillDiners } from "../../../redux/selectors/billSelectors";
import noDiners from "../../../../assets/no-diners.png";

const SplitNames: FC = () => {
  const history = useHistory();
  const dinersList = useTypedSelector(selectSplitBillDiners);
  const dispatch = useTypedDispatch();

  const [tempDiners, setTempDiners] = useState<string[]>(dinersList);

  const handleAddDiner = () => {
    setTempDiners([...tempDiners, ""]);
  };

  const handleRemoveDiner = (index: number) => {
    const updatedDiners = [...tempDiners];
    updatedDiners.splice(index, 1);
    setTempDiners(updatedDiners);
  };

  const handleDinerNameChange = (index: number, value: string) => {
    const updatedDiners = [...tempDiners];
    updatedDiners[index] = value;
    setTempDiners(updatedDiners);
  };

  const handleContinue = () => {
    const validDiners = tempDiners.filter((diner) => diner.trim() !== "");
    validDiners.forEach((diner) => {
      dispatch(addDiner(diner));
    });
    history.push("/payment/split-bill");
  };

  return (
    <Layout pageTitle="Payment" backButton={true}>
      {tempDiners.length === 0 ? (
        <div className={styles.emptyDinersScreen}>
          <h2 style={{ marginBottom: 50 }}>No diners added yet!</h2>
          <img src={noDiners} alt="No Diners Image" />
          <p>Click on the button below to add diners.</p>
          <IonButton onClick={handleAddDiner}>Add a Diner</IonButton>
        </div>
      ) : (
        <div className={styles.splitNamesContainer}>
          <div>
            <IonText style={{ color: "#979797" }}>
              Please enter the names of diners splitting the bill.
            </IonText>
            <IonList className={styles.namesListContainer}>
              {tempDiners.map((diner: string, index: number) => (
                <IonItem key={index} className={styles.dinerItem}>
                  <IonInput
                    value={diner}
                    placeholder="Enter diner's name"
                    onIonChange={(e) =>
                      handleDinerNameChange(index, e.target.value as string)
                    }
                    onBlur={() =>
                      handleDinerNameChange(index, tempDiners[index])
                    }
                    fill="solid"
                  />
                  <IonIcon
                    icon={trashOutline}
                    slot="end"
                    onClick={() => handleRemoveDiner(index)}
                  />
                </IonItem>
              ))}
            </IonList>
            <div className="ion-text-center">
              <IonButton onClick={handleAddDiner} fill="clear">
                <IonIcon icon={addCircleOutline} slot="start" />
                Add Another Diner
              </IonButton>
            </div>
          </div>
          <div>
            <IonButton expand="full" onClick={handleContinue}>
              Continue
            </IonButton>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SplitNames;
