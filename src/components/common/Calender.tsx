import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";

type CalenderProps = {
  defaultValue: Dayjs;
  changeHandler: (value: Dayjs) => void;
};

export default function Calender({
  defaultValue,
  changeHandler,
}: CalenderProps) {
  return (
    <div className="bg-zinc-800 text-white rounded-xl p-4 shadow-lg w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            color: "white",
            "& .MuiPickersDay-dayWithMargin": {
              color: "#fff",
              borderRadius: "8px",
            },
            "& .Mui-selected": {
              backgroundColor: "#3b82f6 !important",
              color: "#fff",
            },
            "& .MuiPickersCalendarHeader-label": {
              color: "#fff",
              fontWeight: "bold",
            },
            "& .MuiPickersArrowSwitcher-button": {
              color: "#fff",
            },
          }}
          value={defaultValue}
          onChange={(newValue) => changeHandler(newValue ?? dayjs(new Date()))}
        />
      </LocalizationProvider>
    </div>
  );
}
