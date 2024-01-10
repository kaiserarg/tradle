import { csv } from "d3-fetch";
import { useEffect, useState } from "react";
import { countriesWithImage, Country } from "../domain/countries";

interface DateCountry {
  country: string;
  date: string;
}

export function useCountry(): [Country | undefined] {
  const [randomCountry, setRandomCountry] = useState<Country | undefined>(undefined);

  useEffect(() => {
    csv<DateCountry>("data.csv", (row) => {
      const country = row.country ?? ""; // Provide default value if undefined
      const date = row.date ?? ""; // Provide default value if undefined
      return { country, date };
    }).then((data) => {
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const forcedCountryCode = data[randomIndex].country.toUpperCase();
        const country = countriesWithImage.find((c) => c.code === forcedCountryCode);
        setRandomCountry(country);
      }
    });
  }, []); // Empty dependency array to run only on mount

  return [randomCountry];
}