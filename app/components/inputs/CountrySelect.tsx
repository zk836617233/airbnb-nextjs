"use client";

import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
      formatOptionLabel={(options: any) => (
        <div className="flex flex-row items-center gap-3">
          <div>{options.flag}</div>
          <div>
            {options.label},
            <span className="ml-1 text-neutral-500">{options.region}</span>
          </div>
        </div>
      )}
    />
  );
};

export default CountrySelect;
