import { IonButton, IonIcon, IonText } from "@ionic/react";
import { remove, add } from "ionicons/icons";
import { useState } from "react";

interface CounterButtonProps {
    amount: number;
};

const CounterButton: React.FC<CounterButtonProps> = ({ amount }) => {
    const [values, setValues] = useState({
        count: amount,
        showAdd: true,
    });

    const decrement = () => {
        if (values['count'] > 1) {
            setValues({ count: values['count'] - 1, showAdd: values['showAdd'] });
        }
        if (values['count'] === 1) {
            setValues({ count: values['count'] - 1, showAdd: true });
        }
    };

    const increment = () => {
        setValues({ count: values['count'] + 1, showAdd: false });
    };

    return (
        <div>
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
