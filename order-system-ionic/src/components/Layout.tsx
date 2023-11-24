import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from "@ionic/react";
import NavBar from "./NavBar";
import { arrowBackCircle } from "ionicons/icons";
import { useHistory } from "react-router";

// use this component for each page instead of IonPage 
export default function Layout(props: LayoutProps) {
    const history = useHistory();

    const handleBackButtonClick = () => {
        // history.goBack();       // go back
        history.push('/home');     // go to homepage
    }; 

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
                {props.backButton && (
                    <IonButtons slot="start">
                    <IonButton shape="round" size="large" fill="clear" onClick={handleBackButtonClick}>
                        <IonIcon slot="icon-only" icon={arrowBackCircle}></IonIcon>
                    </IonButton>
                    </IonButtons>
                )}
              <NavBar pageTitle={props.pageTitle}></NavBar>
            </IonToolbar>
          
          </IonHeader>
          <IonContent fullscreen className="ion-padding">
            {props.children}
          </IonContent>
        </IonPage>
      );
    
}

interface LayoutProps{
    pageTitle: string;
    backButton?: boolean;   
    children: any;
}