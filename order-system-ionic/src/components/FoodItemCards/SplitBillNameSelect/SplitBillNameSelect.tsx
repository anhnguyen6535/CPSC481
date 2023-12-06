import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { Diner } from "../../../redux/reducers/billReducer";
import styles from "./SplitBillNameSelect.module.scss"


interface NameSelectProps {
    diners: Diner[];
};

const mapNamesToSelectOptions = (diners: Diner[]) => {
    return diners.map((diner) => (
        <IonSelectOption value={diner.index}>{diner.name}</IonSelectOption>
    ));
};

const SplitBillNameSelect: React.FC<NameSelectProps> = ({ diners }) => {
    return (
        <IonList inset={true} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IonItem className={styles.select}>
                {/* <IonSelect shape="round" justify="end" placeholder="Split" multiple={true} cancelText="Cancel" okText="Split" interface="popover" style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
                <IonSelect shape="round" placeholder="Split" multiple={true} interface="popover">
                    {mapNamesToSelectOptions(diners)}
                </IonSelect>
            </IonItem>
        </IonList>
    );
};

export default SplitBillNameSelect;
