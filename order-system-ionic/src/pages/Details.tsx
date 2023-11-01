import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonIcon, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Details.css';
import { arrowBack, arrowBackCircle, backspace } from 'ionicons/icons';


const Details: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        
      <div class="backButton">
        <IonButton shape='round' size='large' fill='clear'>
            <IonIcon slot="icon-only" icon={arrowBackCircle}></IonIcon>
        </IonButton>
      </div>  
    
      <img src="https://www.thespruceeats.com/thmb/e-lll-PpJ5F-MF4C57LYag3IAB8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-vegan-black-bean-veggie-burgers-3377008-hero-05-f7c0f0d9865e48b6be52a4c76ee22438.jpg"></img>

    <div>

      <div class="rightcol">
        <h2>Vegan Mushroom Bean Burger</h2>
      </div>

      <div class="leftcol">
        <h3> $13.99 </h3>
      </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h4>Description</h4>
        <h5>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi illum aperiam eaque molestias et! Voluptatibus, porro illo. Eius minima consectetur repellendus eligendi, dignissimos velit atque fuga. Ullam nobis dolore soluta.</h5>
        <h4>Ingredients</h4>
        <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, delectus?</h5>

        <br></br>
        <h2>Special Instructions</h2>

        <div class="input">
            <IonInput aria-label="Email" placeholder=" Enter instructions here..."></IonInput> 
        </div>

        <div class='Button'>
            <IonButton expand="block">Add to Order</IonButton>
        </div>
    
    </div>
    


      </IonContent>
    </IonPage>
  );
};

export default Details;
