import { IonIcon } from "@ionic/react";
import { leaf, egg, logoGoogle } from "ionicons/icons";

interface DietProps {
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
};  

const DietIcons: React.FC<DietProps> = ({ vegan, vegetarian, glutenFree }) => {
    return (
        <div style={{ display: 'flex', paddingTop: '0.5rem' }}>
            {vegan ? <IonIcon icon={leaf} style={{ marginRight: '0.1rem' }} /> : null}
            {vegetarian ? <IonIcon icon={egg} style={{ marginRight: '0.1rem' }} /> : null}
            {glutenFree ? <IonIcon icon={logoGoogle} style={{ marginRight: '0.1rem' }} /> : null}
        </div>
    );
}

export default DietIcons;
export type { DietProps };