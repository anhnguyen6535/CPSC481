import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import DietIcons from "../DietIcons";
import { formatPrice } from "../Utils";
import SplitBillNameSelect from "../NameSelect";
import { MenuItem } from "../../../types";
import styles from "./SplitBillFoodItemCard.module.scss";
import { getFoodImageUri } from "../../../../data/menuItems/utils";

interface SplitBillFoodCardProps {
    item: MenuItem;
    amount: number;
    names: string[];
};

const SplitBillFoodItemCard: React.FC<SplitBillFoodCardProps> = ({ item, amount, names }) => {
    // return (
    //     <IonCard style={{ borderRadius: '1rem' }}>
    //         <div style={{ display: 'flex', flexDirection: 'row' }}>
    //             <img src={imagePath} alt={item.name} style={{ width: '7.5rem', height: '7.5rem', objectFit: 'cover', padding: '1rem', borderRadius: '25%' }} />
    //             <IonCardHeader>
    //                 <IonCardTitle>{name}</IonCardTitle>
    //                 <IonCardSubtitle>{formatPrice(price)}</IonCardSubtitle>
    //             </IonCardHeader>
    //             <SplitBillNameSelect names={names} />
    //         </div>
    //     </IonCard>
    // );
    return (
        <IonCard className={styles.ionCardContainer}>
            <div className={styles.divContent} >
                <img src={getFoodImageUri(item.imagePath)} alt={item.name} className={styles.cardImage} />

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    {/* <IonCardHeader style={{ flexWrap: 'wrap' }}> */}
                    <IonCardHeader style={{ flexWrap: 'wrap' }}>
                        {/* <IonCardTitle className={styles.foodName}>{item.name}</IonCardTitle> */}
                        <IonCardTitle className={styles.foodName}>{item.name}</IonCardTitle>
                        <IonCardTitle>{formatPrice(item.price * amount)}</IonCardTitle>
                    </IonCardHeader>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <SplitBillNameSelect names={names}/>
                    </div>
                </div>
            </div>
        </IonCard>
    );
};

export default SplitBillFoodItemCard;
