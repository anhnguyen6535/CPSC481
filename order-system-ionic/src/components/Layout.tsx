import { IonContent, IonHeader, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from "@ionic/react";
import NavBar from "./NavBar";
import { ReactElement } from "react";

export default function Layout(props: LayoutProps) {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Pay</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                {props.children}
            </IonContent>
    </IonPage>
    )
}

interface LayoutProps{
    children: any;
}