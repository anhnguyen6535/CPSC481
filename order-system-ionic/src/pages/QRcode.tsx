import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonIcon, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './QRcode.css';
import { arrowBack, arrowBackCircle, backspace, close } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

const QRcode: React.FC = () => {
  const history = useHistory();
  // based on https://medium.com/js-now/creating-a-real-time-qr-code-scanner-with-vanilla-javascript-part-1-2-creating-the-scanner-a8934ee8f614
  function test(){
  	useEffect(() => {
		const video = document.querySelector('video');
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
		<div className="XButton">
        <IonButton shape='round' size='large' fill='clear' color='light' onClick={(event)=> {history.push("/welcome")}}>
            <IonIcon slot="icon-only" icon={close}></IonIcon>
        </IonButton>
		</div>
		<video id="video" className = "tost" width="150" height="150" autoPlay onClick={() => {
                history.push("/home");
              }}></video>
		{test()}
		<div className="box">
			<div className="BG-visor" />
		</div>
      </IonContent>
    </IonPage>
  );
};

export default QRcode;