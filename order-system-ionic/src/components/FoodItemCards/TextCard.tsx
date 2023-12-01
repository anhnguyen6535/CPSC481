import { IonItem, IonLabel, IonNote } from "@ionic/react";
import css from "../../styles/TextCard.module.css"

export default function TextCard(props: TextCardProps) {
  const validLinesValues = ['none', 'full', 'inset', 'inset-x'];
  const lines = validLinesValues.includes(props.lines || '') ? props.lines : 'full';
  const color = props.noteColor || 'red';

  return (
    <IonItem lines={lines as 'none' | 'full' | 'inset' | undefined} className={css.ionItem}>
      <IonLabel>{props.label}</IonLabel>
      <IonNote slot='end' style={{ color: color }}>
        ${props.note}
      </IonNote>
    </IonItem>
  );
}

interface TextCardProps {
  lines?: string;
  label: string;
  note: string;
  noteColor?: string;
}
