"use client";
import { createContext, useContext, useState } from "react";

interface ModalContextProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const SlotModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const SlotModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <SlotModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </SlotModalContext.Provider>
  );
};

export const useSlotModal = () => {
  const context = useContext(SlotModalContext);
  if (context === undefined) {
    throw new Error("useSlotModal must be used within a SlotModalProvider");
  }
  return context;
};
