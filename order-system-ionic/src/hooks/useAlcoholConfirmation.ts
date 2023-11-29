import { useState } from 'react';

const useAlcoholConfirmation = () => {
  const [isAlcoholConfirmationOpen, setAlcoholConfirmationOpen] = useState(false);

  const openAlcoholConfirmation = () => {
    setAlcoholConfirmationOpen(true);
  };

  const closeAlcoholConfirmation = () => {
    setAlcoholConfirmationOpen(false);
  };

  return { isAlcoholConfirmationOpen, openAlcoholConfirmation, closeAlcoholConfirmation };
};

export default useAlcoholConfirmation;
