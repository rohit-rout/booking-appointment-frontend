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
  changeHandler,
  defaultValue,
}: CustomSelectProps) => {
  const { options } = useTimezoneSelect({
    labelStyle,
    timezones,
  });

  return (
    <div className="w-full flex justify-center">
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        defaultValue={defaultValue}
        onChange={changeHandler}
        options={options}
        getOptionLabel={(e) => e.label}
        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPlacement="top"
      />
    </div>
  );
};

export default CustomSelect;
