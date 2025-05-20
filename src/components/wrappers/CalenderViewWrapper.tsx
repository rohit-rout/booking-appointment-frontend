"use client";

import { useState } from "react";
import Calender from "../common/Calender";
import CustomSelect from "../common/Select";
import dayjs, { Dayjs } from "dayjs";
import TimeSlotList from "../common/TimeSlotList";
import SlotBookModal from "../modals/SlotBookModal";

const defaultTimezone = {
  value: "Pacific/Midway",
  label: "(GMT-11:00) Midway Island, Samoa",
  offset: -11,
  abbrev: "SST",
  altName: "Samoa Standard Time",
};

export default function CalendarViewWrapper() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [selectedTimezone, setSelectedTimezone] = useState(defaultTimezone);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-2">
        <Calender defaultValue={selectedDate} changeHandler={setSelectedDate} />
        <TimeSlotList date={selectedDate} timezone={selectedTimezone} />
      </div>
      <CustomSelect
        defaultValue={selectedTimezone}
        changeHandler={setSelectedTimezone}
      />
      <SlotBookModal />
    </div>
  );
}
