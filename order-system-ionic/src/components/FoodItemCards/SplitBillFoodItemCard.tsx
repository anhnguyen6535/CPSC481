import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import DietIcons from "./DietIcons";
import { formatPrice } from "./Utils";
import SplitBillNameSelect from "./NameSelect";


interface SplitBillFoodCardProps {
    name: string;
    imagePath: string;
    price: number;
    names: string[];
};

const SplitBillFoodItemCard: React.FC<SplitBillFoodCardProps> = ({ name, imagePath, price, names }) => {
    return (
        <IonCard style={{ borderRadius: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={imagePath} alt={name} style={{ width: '7.5rem', height: '7.5rem', objectFit: 'cover', padding: '1rem', borderRadius: '25%' }} />
                <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>{formatPrice(price)}</IonCardSubtitle>
                </IonCardHeader>
                <SplitBillNameSelect names={names} />
            </div>
        </IonCard>
    );
};

export default SplitBillFoodItemCard;
