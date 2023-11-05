import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonIcon, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Details.css';
import { arrowBack, arrowBackCircle, backspace } from 'ionicons/icons';


function clickReadMore() {
  var dots = document.getElementById("dots")!;
  var moreText = document.getElementById("moreDesc")!;
  var btnText = document.getElementById("readMore")!;

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

function clickReadMore2() {
  var dots = document.getElementById("dots2")!;
  var moreText = document.getElementById("moreIng")!;
  var btnText = document.getElementById("readMore2")!;

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

const Details: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        
      <div className="backButton">
        <IonButton shape='round' size='large' fill='clear'>
            <IonIcon slot="icon-only" icon={arrowBackCircle}></IonIcon>
        </IonButton>
      </div>  
    
      <img src="https://www.thespruceeats.com/thmb/e-lll-PpJ5F-MF4C57LYag3IAB8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-vegan-black-bean-veggie-burgers-3377008-hero-05-f7c0f0d9865e48b6be52a4c76ee22438.jpg"></img>

    <div>

      <div className="rightcol">
        <h2>Vegan Mushroom Bean Burger</h2>
      </div>

      <div className="leftcol">
        <h3> $13.99 </h3>
      </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h4>Description</h4>

        <h5>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          <span id='dots'>...</span>
          <span id='moreDesc'> Modi illum aperiam eaque molestias et! Voluptatibus, porro illo. Eius minima consectetur repellendus eligendi, dignissimos velit atque fuga. Ullam nobis dolore soluta.</span>
          </h5>

          <button id='readMore' onClick={()=>clickReadMore()}>Read More</button>

        <h4>Ingredients</h4>
        <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          <span id='dots2'>...</span>
          <span id='moreIng'> Modi illum aperiam eaque molestias et! Voluptatibus, porro illo. Eius minima consectetur repellendus eligendi, dignissimos velit atque fuga. Ullam nobis dolore soluta.,</span>
          </h5>

          <button id='readMore2' onClick={()=>clickReadMore2()}>Read More</button>

        <br></br>
        <h2>Special Instructions</h2>

        <div className="input">
            <IonInput aria-label="Email" placeholder=" Enter instructions here..."></IonInput> 
        </div>

        <div className='Button'>
            <IonButton expand="block">Add to Order</IonButton>
        </div>
    
    </div>
    


      </IonContent>
    </IonPage>
  );
};

export default Details;
