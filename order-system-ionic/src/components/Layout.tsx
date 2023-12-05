import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { useTypedSelector } from "../hooks/reduxHooks";
import { selectIsBillOrdered } from "../redux/selectors/billSelectors";
import NavBar from "./Navbar/NavBar";

// use this component for each page instead of IonPage
export default function Layout(props: LayoutProps) {
  const isBillOrdered = useTypedSelector(selectIsBillOrdered);
  const handleScroll = (event: CustomEvent) => {
    // Prevent the scroll event to disable scrolling
    event.preventDefault();
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar pageTitle={props.pageTitle} backButton={props.backButton} callWaiter={props.callWaiter}/>
      </IonHeader>
      <IonContent fullscreen className="ion-padding" scrollEvents={props.scroll} onIonScroll={handleScroll}>
        {props.children}
      </IonContent>
    </IonPage>
  );
}

interface LayoutProps {
  pageTitle: string;
  backButton?: boolean;
  scroll?: boolean;
  callWaiter?: boolean;
  children: any;
}
