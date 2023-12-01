import React from "react";
import { useLocation } from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome";

const QRScanRedirect: React.FC<QRRedirectProps> = ({ children }) => {
  const location = useLocation();

  return location.pathname == "/welcome" || location.pathname == "/" ? (
    <Welcome />
  ) : (
    <>{children}</>
  );
};

export default QRScanRedirect;

interface QRRedirectProps {
  children: any;
}
