import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonCheckbox, IonLabel, IonItem, IonRange, IonIcon, IonText, IonButton } from '@ionic/react';
import { nutritionOutline } from 'ionicons/icons';

interface FilterProps {
  filters: { name: string, label: string, checked: boolean }[];
  setFilters: React.Dispatch<React.SetStateAction<{ name: string; label: string; checked: boolean; }[]>>;
  price: number;
  handlePrice: (e: CustomEvent) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ filters, setFilters, price, handlePrice }) => {

  const handleFilterChange = (index: number) => {
    setFilters(prevFilters => prevFilters.map((filter, i) => i === index ? { ...filter, checked: !filter.checked } : filter));
  }

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {filters.map((filter, index) => (
            <IonItem lines="none" key={filter.name}>
              <IonLabel>{filter.label}</IonLabel>
              <IonCheckbox slot="start" checked={filter.checked} onIonChange={() => handleFilterChange(index)} />
            </IonItem>
          ))}
          <IonText>
            <h2>Price</h2>
          </IonText>
          <IonItem>
            <IonRange min={0} max={100} value={price} pin={true} onIonChange={handlePrice}>
              <IonIcon slot="start" size="small" icon={nutritionOutline} />
              <IonText slot="end">${price}</IonText>
            </IonRange>
          </IonItem>
        </IonList>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <IonButton fill="solid" color="primary">Apply</IonButton>
        </div>
      </IonContent>
    </IonContent>
  );
};

export default FilterComponent;