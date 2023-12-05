import styles from './Empty.module.scss';
import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router';

interface EmptyHandlerProps {
    content: string;
    image: string;
}

const EmptyHandler:React.FC<EmptyHandlerProps> = ({content, image}) => { 
    const history = useHistory();

    const handleRedirectToHomePage = () => {
        history.replace("/home");
    };

    return(
        <div className={styles.noCartItems}>
          <div>
            <div>
              <img
                src={image}
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