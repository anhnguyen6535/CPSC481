import React from "react";
import { useLocation } from "react-router-dom";
import Welcome from "../pages/Welcome";

const QRScanRedirect: React.FC<QRRedirectProps> = ({ children }) => {
  const location = useLocation();

  return location.pathname != "/welcome" ? <>{children}</> : <Welcome />;
};

export default QRScanRedirect;

interface QRRedirectProps {
  children: any;
}
