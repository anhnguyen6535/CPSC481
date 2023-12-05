import { IonCard, IonCardContent } from "@ionic/react";
import { useTypedSelector } from "../../hooks/reduxHooks";
import { selectCartData } from "../../redux/selectors/cartSelectors";
import Divider from "../Divider/Divider";
import TextCard from "../FoodItemCards/TextCard";

type DisplayCostProps = {
    subtotal: number;
    itemBreakdown: boolean;
};

const DisplayCost: React.FC<DisplayCostProps> = ({subtotal, itemBreakdown}) => {
    // fake data
    const taxRate = 0.05;
    const cartData = useTypedSelector(selectCartData);
    
    return(
        <IonCard>
            <IonCardContent>
                {itemBreakdown && 
                    <>
                        {cartData.items.map((foodItem, index) => (
                            <TextCard
                            key={foodItem.item.id}
                            lines={"none"} // Line only for the last item
                            label={`${foodItem.quantity}x ${foodItem.item.name}`}
                            note={`${(foodItem.item.price * foodItem.quantity).toFixed(2)}`}
                            noteColor="black"
                            />
                        ))}
                        <Divider /> 
                    </>
                }


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