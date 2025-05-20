"use client";

import { useCallback, useEffect, useState } from "react";
import TimeSlotButton from "./TimeSlotButton";
import { fetchSlots } from "@/lib/api/slotApi";
import { Dayjs } from "dayjs";
import { useSlotModal } from "@/providers/SlotBookProvider";

// const slots = [
//   "08:00 AM",
//   "08:30 AM",
//   "09:00 AM",
//   "09:30 AM",
//   "10:00 AM",
//   "10:30 AM",
//   "11:00 AM",
//   "11:30 AM",
// ];

type TimeSlotProps = {
  date: Dayjs | null;
  timezone: {
    value: string;
    label: string;
    offset: number;
    abbrev: string;
    altName: string;
  };
};

export default function TimeSlotList({ date, timezone }: TimeSlotProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const { setShowModal } = useSlotModal();

  const getSlots = useCallback(async (date: string, timezone: string) => {
    const slotsData = await fetchSlots(date, timezone);
    setSlots(slotsData.slot);
  }, []);

  const handleSlotSelect = (slot: string) => {
    console.log("rendering slots", slot);
    if (selectedSlot) {
      setShowModal(true);
    }
    setSelectedSlot(slot);
  };

  useEffect(() => {
    getSlots(date?.format("YYYY-MM-DD") || "", timezone.value);
  }, [date, timezone, getSlots]);

  return (
    <div className="flex flex-col items-center max-h-96 overflow-y-scroll no-scrollbar">
      {slots.map((slot) => (
        <TimeSlotButton
          key={slot}
          time={slot}
          selected={slot === selectedSlot}
          onClick={() => handleSlotSelect(slot)}
        />
      ))}
    </div>
  );
}
