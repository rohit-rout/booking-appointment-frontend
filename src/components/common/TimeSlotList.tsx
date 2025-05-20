"use client";

import { useQuery } from "@tanstack/react-query";
import TimeSlotButton from "./TimeSlotButton";
import { fetchSlots } from "@/lib/api/slotApi";
import { Dayjs } from "dayjs";
import { useSlotModal } from "@/providers/SlotBookProvider";
import { TimeZoneT } from "@/lib/interfaces/timezone";

type TimeSlotProps = {
  date: Dayjs;
  timezone: TimeZoneT;
};

export default function TimeSlotList({ date, timezone }: TimeSlotProps) {
  const { setShowModal, setSlotTiming } = useSlotModal();

  const formattedDate = date.format("YYYY-MM-DD");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["slots", formattedDate, timezone.value],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return fetchSlots(formattedDate, timezone.value);
    },
    staleTime: 5 * 60 * 1000,
  });

  const handleSlotSelect = (slot: string) => {
    setSlotTiming({
      timezone,
      time: slot,
      date: formattedDate,
    });
    setShowModal(true);
  };

  const slots = data?.slot || [];

  return (
    <div className="w-[220px] sm:w-[260px] md:w-[300px] max-h-96 overflow-y-auto bg-zinc-800 p-4 rounded-xl shadow-lg flex flex-col gap-3 no-scrollbar">
      {isLoading ? (
        <div className="text-white text-sm text-center animate-pulse">
          Loading slots...
        </div>
      ) : isError ? (
        <div className="text-red-500 text-sm text-center">
          Failed to load slots.
        </div>
      ) : slots.length === 0 ? (
        <div className="text-white text-sm text-center">No slots available</div>
      ) : (
        slots.map((slot: string) => (
          <TimeSlotButton
            key={slot}
            time={slot}
            onClick={() => handleSlotSelect(slot)}
          />
        ))
      )}
    </div>
  );
}
