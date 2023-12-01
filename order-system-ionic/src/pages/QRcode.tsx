import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonIcon, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './QRcode.css';
import { arrowBack, arrowBackCircle, backspace, close } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

const QRcode: React.FC = () => {
  const history = useHistory();
  function test(){
  	useEffect(() => {
	    const video = document.querySelector('video')
	console.log(video);
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Use video without audio
  const constraints = { 
    video: true,
    audio: false
  }
  // Start video stream
   navigator.mediaDevices.getUserMedia(constraints).then(stream => video.srcObject = stream);
	}
	},[]);
  }
  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
		<h1 className="delfino">welcome to the sun-drenched tropical paradise of isle delfino!
		<br />
		we're so pleased to welcome you to our beautiful home!
		<br />
		genebenebenepoopoo
		<br />
		come and enjoy a natural wonderland, to which we've added the world's finnest resort facilities, a spectacular amusement park, and... succulent seafood!
		<br />
		all this and more await you on isle delfino!
		<br />
		come relax and let us refresh your body and spirit.
		<br />
		genebenebenepoopoo
		</h1>
		<div className="XButton">
        <IonButton shape='round' size='large' fill='clear' color='light' onClick={(event)=> {history.push("/welcome")}}>
            <IonIcon slot="icon-only" icon={close}></IonIcon>
        </IonButton>
		</div>
		<video id="video" className = "tost" width="100" height="100" autoPlay></video>
		{test()}
		<div className="box">
			<div className="BG-visor" />
		</div>
      </IonContent>
    </IonPage>
  );
};

export default QRcode;