import { IonItem, IonLabel, IonNote } from "@ionic/react";

export default function TextCard(props: TextCardProps) {
  const validLinesValues = ['none', 'full', 'inset', 'inset-x'];
  const lines = validLinesValues.includes(props.lines || '') ? props.lines : 'full';

  return (
    <IonItem lines={lines as 'none' | 'full' | 'inset' | undefined} style={{ fontSize: '20.0px' }}>
      <IonLabel>{props.label}</IonLabel>
      <IonNote slot='end' style={{ fontSize: '20.0px', color: '#ff4961' }}>
        ${props.note}
      </IonNote>
    </IonItem>
  );
}

interface TextCardProps {
  lines?: string;
  label: string;
  note: string;
}
