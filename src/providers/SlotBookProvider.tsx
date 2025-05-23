"use client";
import { createContext, useContext, useState } from "react";

interface SlotTiming {
  timezone: {
    value: string;
    label: string;
    offset: number;
    abbrev: string;
    altName: string;
  } | null;
  time: string | null;
  date: string | null;
}

interface ModalContextProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  slotTiming: SlotTiming;
  setSlotTiming: (details: SlotTiming) => void;
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
  const [slotTiming, setSlotTiming] = useState<SlotTiming>({
    timezone: null,
    time: null,
    date: null,
  });
  return (
    <SlotModalContext.Provider
      value={{ showModal, setShowModal, slotTiming, setSlotTiming }}
    >
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
