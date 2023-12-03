import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonCheckbox,
  IonItem,
  IonRange,
  IonIcon,
  IonText,
  IonButton,
} from "@ionic/react";
import { nutritionOutline } from "ionicons/icons";

interface Filter {
  name: string;
  label: string;
  checked: boolean;
}

interface FilterProps {
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  price: number | null;
  handlePrice: (value: number | null) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterComponent: React.FC<FilterProps> = ({
  filters,
  setFilters,
  price,
  handlePrice,
  isOpen,
  setIsOpen,
}) => {
  const [localFilters, setLocalFilters] = useState<Filter[]>(filters);
  const [localPrice, setLocalPrice] = useState<number | null>(price);

  const handleFilterChange = (index: number) => {
    setLocalFilters((prevFilters) =>
      prevFilters.map((filter, i) =>
        i === index ? { ...filter, checked: !filter.checked } : filter
      )
    );
  };

  const handleApply = () => {
    setFilters(localFilters);
    handlePrice(localPrice);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setLocalFilters((prevFilters) =>
      prevFilters.map((filter) => ({ ...filter, checked: false }))
    );
    setFilters((prevFilters) =>
      prevFilters.map((filter) => ({ ...filter, checked: false }))
    );
    handlePrice(null);
    setLocalPrice(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (localFilters !== filters) {
      setLocalFilters(filters);
    }
    if (price != localPrice) {
      setLocalPrice(price);
    }
  }, [isOpen, filters]);

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {localFilters.map((filter, index) => (
            <IonItem lines="none" key={filter.name}>
              <IonCheckbox
                slot="start"
                labelPlacement="end"
                checked={filter.checked}
                onIonChange={() => handleFilterChange(index)}
              >
                {filter.label}
              </IonCheckbox>
            </IonItem>
          ))}
          {/* <IonText style={{marginBottom: -100}}> */}
          <h4 style={{ marginBottom: -30 }}>Price</h4>
          {/* </IonText> */}

          <IonRange
            min={0}
            max={100}
            value={localPrice ? localPrice : 0}
            pin={true}
            onIonChange={(e: CustomEvent) => setLocalPrice(e.detail.value)}
          >
            <IonText slot="start">$0</IonText>
            <IonText slot="end">$100</IonText>
          </IonRange>

          {localPrice != null && (
            <IonItem lines="none" style={{ marginTop: "-10px" }}>
              <IonText style={{ fontSize: "small" }}>
                Maximum: ${localPrice}
              </IonText>
            </IonItem>
          )}
        </IonList>
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          <IonButton
            fill="outline"
            size={"small"}
            color="medium"
            shape="round"
            onClick={handleClearFilters}
          >
            Clear
          </IonButton>
          <IonButton
            fill="solid"
            size={"small"}
            color="primary"
            shape="round"
            onClick={handleApply}
          >
            Apply
          </IonButton>
        </div>
      </IonContent>
    </IonContent>
  );
};

export default FilterComponent;
