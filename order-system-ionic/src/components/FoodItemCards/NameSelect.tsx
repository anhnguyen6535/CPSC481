import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";


interface NameSelectProps {
    names: string[];
};

const mapNamesToSelectOptions = (names: string[]) => {
    return names.map((name) => (
        <IonSelectOption value={name}>{name}</IonSelectOption>
    ));
};

const SplitBillNameSelect: React.FC<NameSelectProps> = ({ names }) => {
    return (
        <IonList inset={true} style={{ position: 'absolute', right: 0, background: '0%' }}>
            <IonItem>
                <IonSelect shape="round" justify="end" placeholder="Split" multiple={true} cancelText="Cancel" okText="Split" interface="popover" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {mapNamesToSelectOptions(names)}
                </IonSelect>
            </IonItem>
        </IonList>
    );
};

export default SplitBillNameSelect;
