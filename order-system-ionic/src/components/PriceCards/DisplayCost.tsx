import { IonCard, IonCardContent } from "@ionic/react";
import TextCard from "../FoodItemCards/TextCard";

type DisplayCostProps = {
    subtotal: number;
};

const DisplayCost: React.FC<DisplayCostProps> = ({subtotal}) => {
    // fake data
    const taxRate = 0.05;

    return(
        <IonCard>
            <IonCardContent>
                <TextCard
                    lines="none"
                    label="Subtotal"
                    note={`${subtotal.toFixed(2)}`}
                    noteColor="black"
                />
                <TextCard
                    label="Tax"
                    note={`${(subtotal * taxRate).toFixed(2)}`}
                    noteColor="black"
                />
                <TextCard
                    lines="none"
                    label="Total"
                    note={`${(subtotal * (1 + taxRate)).toFixed(2)}`}
                    noteColor="black"
                    fontWeight="bold"
                />
            </IonCardContent>     
        </IonCard>
    )
}

export default DisplayCost;