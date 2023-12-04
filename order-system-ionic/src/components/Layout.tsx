import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { useTypedSelector } from "../hooks/reduxHooks";
import { selectIsBillOrdered } from "../redux/selectors/billSelectors";
import Dialog from "./Dialog/Dialog";
import NavBar from "./Navbar/NavBar";

// use this component for each page instead of IonPage
export default function Layout(props: LayoutProps) {
  const isBillOrdered = useTypedSelector(selectIsBillOrdered);

  
  return (
    <IonPage>
      <IonHeader>
        <NavBar pageTitle={props.pageTitle} backButton={props.backButton}/>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {props.children}
        <Dialog
            title="Bill Ordered!"
            content="A waiter has been notified and will bring the bill to you shortly."
            isOpen={isBillOrdered}
            backdropDismiss={false}
        />
      </IonContent>
    </IonPage>
  );
}

interface LayoutProps {
  pageTitle: string;
  backButton?: boolean;
  children: any;
}
