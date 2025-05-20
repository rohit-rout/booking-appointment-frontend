"use client";

import { useState } from "react";
import Calender from "../common/Calender";
import CustomSelect from "../common/Select";
import dayjs, { Dayjs } from "dayjs";
import TimeSlotList from "../common/TimeSlotList";
import SlotBookModal from "../modals/SlotBookModal";

const defaultTimezone = {
  value: "Asia/Kolkata",
  label: "(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi",
  offset: 5.5,
  abbrev: "IST",
  altName: "India Standard Time",
};

export default function CalendarViewWrapper() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date()));
  const [selectedTimezone, setSelectedTimezone] = useState(defaultTimezone);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black text-white px-4">
      <div className="bg-zinc-900 shadow-xl rounded-2xl p-6 w-full max-w-5xl flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Book Your Slot
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="w-full md:w-1/4 bg-zinc-800 rounded-xl p-4 shadow-inner text-sm space-y-4">
            <div className="flex items-start gap-2">
              <span className="text-xl">📅</span>
              <div>
                <p className="font-semibold">Selected Date</p>
                <p>{selectedDate.format("dddd, MMMM D, YYYY")}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-xl">⏱️</span>
              <div>
                <p className="font-semibold">Duration</p>
                <p>30 minutes</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-xl">🌐</span>
              <div>
                <p className="font-semibold">Timezone</p>
                <p>{selectedTimezone.label}</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <Calender
              defaultValue={selectedDate}
              changeHandler={setSelectedDate}
            />
          </div>

          <div className="w-full md:w-1/3">
            <TimeSlotList date={selectedDate} timezone={selectedTimezone} />
          </div>
        </div>

        <div className="mt-4">
          <CustomSelect
            defaultValue={selectedTimezone}
            changeHandler={setSelectedTimezone}
          />
        </div>
      </div>

      <SlotBookModal />
    </div>
  );
}
