import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";

type CalenderProps = {
  defaultValue: Dayjs | null;
  changeHandler: (value: Dayjs | null) => void;
};

export default function Calender({
  defaultValue,
  changeHandler,
}: CalenderProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={defaultValue}
        onChange={(newValue) => changeHandler(newValue)}
      />
    </LocalizationProvider>
  );
}
