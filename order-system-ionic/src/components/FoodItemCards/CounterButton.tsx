import { IonButton, IonIcon, IonText } from "@ionic/react";
import { remove, add, trash } from "ionicons/icons";
import { useState } from "react";

interface CounterButtonProps {
    amount: number;
    enableTrash?: boolean | false;
    showTrashIcon?: boolean | false;
};

const CounterButton: React.FC<CounterButtonProps> = ({ amount, enableTrash }) => {
    const [values, setValues] = useState({
        count: amount,
        showTrash: amount !== 0 && enableTrash,
        showAdd: amount === 0, // If the amount is 0, then show the add button
    });

    const resetAmount = () => {
        setValues({ count: 0, showAdd: true, showTrash: false && enableTrash });
    }

    const decrement = () => {
        if (values['count'] > 1) {
            setValues({ count: values['count'] - 1, showAdd: values['showAdd'], showTrash: values['showTrash'] && enableTrash });
        } else if (values['count'] === 1) {
            setValues({ count: 0, showAdd: true, showTrash: false && enableTrash });
        }
    };

    const increment = () => {
        setValues({ count: values['count'] + 1, showAdd: false, showTrash: true && enableTrash });
    };

    return (
        <div>
            <IonIcon icon={trash} onClick={() => resetAmount()} style={{ visibility: values['showTrash'] ? 'visible' : 'hidden', position: 'absolute', top: 0, right: 0, padding: '1rem' }} />
            <IonButton color="primary" shape="round" fill="outline" size="small" onClick={increment} style={{ visibility: values['showAdd'] ? 'visible' : 'hidden', position: 'absolute', bottom: 0, right: 0, padding: '1rem', width: '35%', textTransform: 'none' }}>Add</IonButton>
            <div>
                <IonButton disabled={true} color="medium" shape="round" fill="solid" size="small" style={{ visibility: values['showAdd'] ? 'hidden' : 'visible', position: 'absolute', bottom: 0, right: 0, padding: '1rem', width: '35%', textTransform: 'none' }}></IonButton>
                <div style={{ visibility: values['showAdd'] ? 'hidden' : 'visible', position: 'absolute', bottom: 0, right: 0, paddingBottom: '1.3rem', paddingRight: '2.0rem', textTransform: 'none' }}>
                    <IonIcon color="dark" icon={remove} onClick={decrement} style={{ marginRight: '0.5rem' }} />
                    <IonText color="primary" style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem' }}>{values['count']}</IonText>
                    <IonIcon color="dark" icon={add} onClick={increment} style={{ marginLeft: '0.5rem' }} />
                </div>
            </div>
        </div>
    );
};

export default CounterButton;
