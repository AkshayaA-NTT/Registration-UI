import { createContext, useContext, useState } from "react";

export const DealContext = createContext();

export const useDeal = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error("useDeal must be used within DealProvider");
  }
  return context;
};

export const DealProvider = ({ children }) => {
  const [clientId, setClientId] = useState(null);
  const [clientData, setClientData] = useState({});
  const [selectedSpoc, setSelectedSpoc] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [bookingLink, setBookingLink] = useState(null);


  const clearDealContext = () => {
    setClientId(null);
    setClientData({});
    setSelectedSpoc(null);
    setSelectedSlot(null);
    setBookingId(null);
    setBookingLink(null);
  };

  const value = {
    clientId,
    setClientId,
    clientData,
    setClientData,
    selectedSpoc,
    setSelectedSpoc,
    selectedSlot,
    setSelectedSlot,
    bookingId,
    setBookingId,
    bookingLink,
    setBookingLink,
    clearDealContext,
  };

  return <DealContext.Provider value={value}>{children}</DealContext.Provider>;
};
