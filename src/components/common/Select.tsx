/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";
import Select from "react-select";
import { useTimezoneSelect, allTimezones } from "react-timezone-select";
const labelStyle = "original";
const timezones = {
  ...allTimezones,
  "Europe/Berlin": "Frankfurt",
};

type CustomSelectProps = {
  defaultValue: any;
  changeHandler: (value: any) => void;
};

export const CustomSelect = ({
  defaultValue,
  changeHandler,
}: CustomSelectProps) => {
  const { options } = useTimezoneSelect({
    labelStyle,
    timezones,
  });

  return (
    <div className="App">
      <Select
        className="!min-w-[300px]"
        defaultValue={defaultValue}
        onChange={changeHandler}
        options={options}
      />
    </div>
  );
};

export default CustomSelect;
