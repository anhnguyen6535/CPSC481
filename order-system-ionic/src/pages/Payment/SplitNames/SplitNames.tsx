import React, { FC, useEffect, useState } from "react";
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
  IonToast,
} from "@ionic/react";
import { addCircleOutline, trashOutline } from "ionicons/icons";
import Layout from "../../../components/Layout";
import { selectSplitBillDiners } from "../../../redux/selectors/billSelectors";
import noDiners from "../../../../assets/no-diners.png";
import { Diner } from "../../../redux/reducers/billReducer";

const SplitNames: FC = () => {
  const history = useHistory();
  const dinersList = useTypedSelector(selectSplitBillDiners);
  const dispatch = useTypedDispatch();

  const [tempDiners, setTempDiners] = useState<Diner[]>(dinersList ? dinersList : []);
  const [showErrorToast, setShowErrorToast] = useState(false);

  console.log("redux diners list is: ", dinersList);
  console.log("tempDiners is: ", tempDiners);

  const handleAddDiner = () => {
    setTempDiners([...tempDiners, { index: tempDiners.length, name: "" }]);
  };

  const handleRemoveDiner = (index: number) => {
    dispatch(removeDiner(index));
  };

  const handleDinerNameAdd = (index: number, value: string) => {
    dispatch(addDiner(value, index));
  };

  const handleDinerNameChange = (index: number, ev: Event) => {
    const value = (ev.target as HTMLIonInputElement).value as string;

    setTempDiners(
      tempDiners.map((diner) =>
        diner.index === index ? { ...diner, name: value } : diner
      )
    );
  };

  const handleContinue = () => {
    const hasEmptyName = tempDiners.some((diner) => diner.name.trim() === "");

    if (hasEmptyName) {
      setShowErrorToast(true);
    } else {
      tempDiners.forEach((diner) => {
        if (diner.name.trim() !== "")
          dispatch(addDiner(diner.name, diner.index));
      });
      history.push("/pay/split-bill");
    }
  };

  const handleToastClose = () => {
    setShowErrorToast(false);
  };

  useEffect(() => {
    setTempDiners(dinersList);
  }, [dinersList]);

  return (
    <Layout pageTitle="Split Bill" backButton={true}>
      {tempDiners.length === 0 ? (
        <div className={styles.emptyDinersScreen}>
          <h3 style={{ marginBottom: 50, fontSize: "2rem" }}>
            No diners added yet!
          </h3>
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
              {tempDiners.map((diner: Diner) => (
                <IonItem key={diner.index} className={styles.dinerItem}>
                  <IonInput
                    value={diner.name}
                    placeholder="Enter diner's name"
                    onIonInput={(ev) => handleDinerNameChange(diner.index, ev)}
                    onIonChange={(e) =>
                      handleDinerNameAdd(diner.index, e.detail.value!)
                    }
                  />
                  <IonIcon
                    icon={trashOutline}
                    slot="end"
                    onClick={() => handleRemoveDiner(diner.index)}
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
          <div className="ion-text-center">
            <IonButton style={{ width: "80vw" }} onClick={handleContinue}>
              Continue
            </IonButton>
          </div>
          <IonToast
            isOpen={showErrorToast}
            onDidDismiss={handleToastClose}
            message="Please enter a name for all diners before continuing."
            duration={3000}
            color="danger"
            position="top"
          />
        </div>
      )}
    </Layout>
  );
};

export default SplitNames;
