import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@mui/material";

import styles from "./CountryPicker.module.css";

const CountryPicker = ({ data, handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const countries_stat = data.countries_stat;
    const countries = countries_stat.map((country) => country.country_name);
    setCountries(countries);
  }, [data]);

  return (
    <FormControl className={styles.formcontrol}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => {
          handleCountryChange(e.target.value);
        }}
      >
        <option value="">Global</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
