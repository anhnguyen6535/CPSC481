import { IonContent, IonHeader, IonPage } from "@ionic/react";
import NavBar from "./NavBar";

// use this component for each page instead of IonPage
export default function Layout(props: LayoutProps) {
  return (
    <IonPage>
      <IonHeader>
        <NavBar pageTitle={props.pageTitle} backButton={props.backButton}/>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {props.children}
      </IonContent>
    </IonPage>
  );
}

interface LayoutProps {
  pageTitle: string;
  backButton?: boolean;
  children: any;
}
