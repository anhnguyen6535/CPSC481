import styles from './Empty.module.scss';
import cartImage from "../../../assets/cart.png";
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router';

interface EmptyHandlerProps {
    content: string;
}

const EmptyHandler:React.FC<EmptyHandlerProps> = ({content}) => { 
    const history = useHistory();

    const handleRedirectToHomePage = () => {
        history.replace("/home");
    };

    return(
        <div className={styles.noCartItems}>
          <div>
            <div>
              <img
                src={cartImage}
                alt="${content} is empty"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <p>There are no items in your {content}.</p>
          </div>
          <IonButton
            onClick={handleRedirectToHomePage}
            className={styles.noCartItemsButton}
          >
            Add Items Now
          </IonButton>
        </div>
    )
}

export default EmptyHandler;