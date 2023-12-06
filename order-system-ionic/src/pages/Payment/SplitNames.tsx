import Layout from "../../components/Layout"
import { IonList, IonItem, IonInput, IonButton, IonIcon } from '@ionic/react';
import { addCircleOutline, trashOutline } from 'ionicons/icons';
import { SplitBillFoodItemCard } from '../../components/FoodItemCards';
import { useEffect, useState } from 'react';
import DisplayCost from '../../components/PriceCards/DisplayCost';
import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks";
import { selectOrders } from '../../redux/selectors/orderSelectors';
import EmptyHandler from '../../components/Empty/EmptyHandler';
import BillConfirm from './BillConfirm';
import Divider from '../../components/Divider/Divider';
import { selectSplitBillDiners } from "../../redux/selectors/billSelectors";
import { addDiner } from "../../redux/actions/billActions";
import { useHistory } from "react-router-dom";

const SplitNames = () => {
  const history = useHistory();
  const [subtotal, setSubtotal] = useState(0.0);
  const [tempDiners, setTempDiners] = useState([""]);

  const dispatch = useTypedDispatch();

  const handleAddDiner = () => {
    setTempDiners([...tempDiners, ""]);
  }

  const handleRemoveDiner = (index: number) => {
    if (tempDiners.length === 1) {
      return;
    }
    const updatedDiners = [...tempDiners];
    updatedDiners.splice(index, 1);
    setTempDiners(updatedDiners);
  }

  const handleDinerNameChange = (index: number, value: string) => {
    const updatedDiners = [...tempDiners];
    updatedDiners[index] = value;
    setTempDiners(updatedDiners);
  }

  const handleContinue = () => {
    tempDiners.forEach((diner) => {
      dispatch(addDiner(diner));
    });
    history.push("/payment/split-bill");
  };

  return (
    <Layout pageTitle='Payment' backButton={true}>
      <IonList>
        {tempDiners.map((diner: string, index: number) => (
          <IonItem key={index}>
            <IonInput
              value={diner}
              placeholder="Enter diner's name"
              onIonChange={(e) => handleDinerNameChange(index, e.target.value as string)}
              onBlur={(e) => handleDinerNameChange(index, e.target.value as string)}
            />
            <IonIcon
              icon={trashOutline}
              slot="end"
              onClick={() => handleRemoveDiner(index)}
            />
          </IonItem>
        ))}
      </IonList>
      <IonButton expand="full" onClick={handleAddDiner}>
        <IonIcon icon={addCircleOutline} slot="start" />
        Add Another Diner
      </IonButton>
      <IonButton expand="full" onClick={handleContinue}>
        Continue
      </IonButton>
    </Layout>
  );
}

export default SplitNames