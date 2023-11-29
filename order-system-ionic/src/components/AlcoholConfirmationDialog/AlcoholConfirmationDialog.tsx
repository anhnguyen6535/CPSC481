import React from "react";
import Dialog, { ButtonProps } from "../Dialog/Dialog";

interface AlcoholConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlcoholConfirmationDialog: React.FC<AlcoholConfirmationDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const alcoholDialogButtons: ButtonProps[] = [
    {
      text: "Okay",
      primary: false,
      onClick: onClose,
    },
  ];

  return (
    <Dialog
      title="Age Verification"
      content="A waiter will be with you shortly for alcohol age verification."
      buttons={alcoholDialogButtons}
      isOpen={isOpen}
      onDismiss={onClose}
    />
  );
};

export default AlcoholConfirmationDialog;
