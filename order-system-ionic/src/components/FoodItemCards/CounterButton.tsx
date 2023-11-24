import { IonButton, IonIcon, IonText } from "@ionic/react";
import { remove, add, trash } from "ionicons/icons";
import { useState } from "react";

interface CounterButtonProps {
    amount: number;
    enableTrash?: boolean | false;
    showTrashIcon?: boolean | false;
    onAdd?: () => void;
    onRemove?: () => void;
};

const CounterButton: React.FC<CounterButtonProps> = ({ amount, enableTrash, onAdd, onRemove }) => {
    const [values, setValues] = useState({
        count: amount,
        showTrash: amount !== 0 && enableTrash,
        showAdd: amount === 0, // If the amount is 0, then show the add button
    });

    const resetAmount = () => {
        setValues({ count: 0, showAdd: true, showTrash: false && enableTrash });
    }

    const decrement = (event: React.MouseEvent<HTMLIonIconElement, MouseEvent> | React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (values['count'] > 1) {
            setValues({ count: values['count'] - 1, showAdd: values['showAdd'], showTrash: values['showTrash'] && enableTrash });
        } else if (values['count'] === 1) {
            setValues({ count: 0, showAdd: true, showTrash: false && enableTrash });
        }

        onRemove && onRemove();
        event.stopPropagation();
    };

    const increment = (event: React.MouseEvent<HTMLIonIconElement, MouseEvent> | React.MouseEvent<HTMLElement, MouseEvent>) => {
        setValues({ count: values['count'] + 1, showAdd: false, showTrash: true && enableTrash });

        onAdd && onAdd();
        event.stopPropagation();
    };

    return (
        <div>
            <IonIcon icon={trash} onClick={() => resetAmount()} style={{ visibility: values['showTrash'] ? 'visible' : 'hidden', position: 'absolute', top: 0, right: 0, padding: '1rem' }} />
            <IonButton color="primary" shape="round" fill="outline" size="small" onClick={(event) => increment(event)} style={{ visibility: values['showAdd'] ? 'visible' : 'hidden', position: 'absolute', bottom: 0, right: 0, width: '20%', textTransform: 'none' }}>Add</IonButton>
            <div>
                {/* <IonButton disabled={true} color="clear" shape="round" fill="solid" size="small" style={{ visibility: values['showAdd'] ? 'visible' : 'hidden', position: 'absolute', bottom: 0, right: 0, padding: '1rem', width: '35%', textTransform: 'none' }}></IonButton> */}
                <div style={{ visibility: values['showAdd'] ? 'hidden' : 'visible', position: 'absolute', bottom: 0, right: 0, paddingBottom: '1.3rem', paddingRight: '1.0rem', textTransform: 'none'}}>
                    <div style={{borderRadius: 10, backgroundColor: "#DADADA", padding: '0px 10px 0px 10px'}}>
                    <IonIcon color="dark" icon={remove} onClick={(event) => decrement(event)} style={{ marginRight: '0.5rem' }} />
                    <IonText color="primary" style={{ fontSize: '1.15rem', fontWeight: 'bold', margin: '0.5rem' }}>{values['count']}</IonText>
                    <IonIcon color="dark" icon={add} onClick={(event) => increment(event)} style={{ marginLeft: '0.5rem' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounterButton;
