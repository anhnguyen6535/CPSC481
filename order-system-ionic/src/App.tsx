import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, cartOutline, cash } from 'ionicons/icons';
import Welcome from './pages/Welcome';
import Order from './pages/Order';
import Pay from './pages/Pay';
import Help from './pages/Help';
import Details from './pages/Details';
import HomePage from './pages/HomePage/HomePage';
import './App.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/welcome">
            <Welcome />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/order">
            <Order />
          </Route>
          <Route exact path="/pay">
            <Pay />
          </Route>
          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>
          <Route exact path="/details">
            <Details />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="order" href="/order">
            <IonIcon aria-hidden="true" icon={cartOutline} />
            <IonLabel>Cart</IonLabel>
          </IonTabButton>
          <IonTabButton tab="pay" href="/pay">
            <IonIcon aria-hidden="true" icon={cash} />
            <IonLabel>Pay</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
