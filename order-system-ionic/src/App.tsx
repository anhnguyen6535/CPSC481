import { Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, cartOutline, cash } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import routes from "./route-config";
import QRScanRedirect from "./components/QRScanRedirect";
import { useTypedSelector } from "./hooks/reduxHooks";
import { selectIsBillOrdered } from "./redux/selectors/billSelectors";
import BillOrdered from "./pages/Payment/BillOrdered/BillOrdered";

setupIonicReact();

const App: React.FC = () => {
  const isBillOrdered = useTypedSelector(selectIsBillOrdered);

  return (
    <IonApp>
      <IonReactRouter>
        <QRScanRedirect>
          <IonTabs>
            <IonRouterOutlet>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                >
                    {route.path === '/welcome' ? (
                        <route.component />
                      ) : isBillOrdered ? (
                        <BillOrdered />
                      ) : (
                        <route.component />
                    )}
                </Route>
              ))}
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home" disabled={isBillOrdered}>
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="order" href="/cart"  disabled={isBillOrdered}>
                <IonIcon aria-hidden="true" icon={cartOutline} />
                <IonLabel>Cart</IonLabel>
              </IonTabButton>
              <IonTabButton tab="pay" href="/pay"  disabled={isBillOrdered}>
                <IonIcon aria-hidden="true" icon={cash} />
                <IonLabel>Pay</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </QRScanRedirect>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
