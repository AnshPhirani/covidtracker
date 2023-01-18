import axios from "axios";

// const url = " https://covid19.mathdro.id/api"; // not working anymore

// integrated new api
export const fetchData = async (country) => {
  const options = {
    method: "GET",
    url: "https://corona-virus-world-and-india-data.p.rapidapi.com/api",
    headers: {
      "X-RapidAPI-Key": "47072f9a9cmsh08b0805cad6b7eap1e360bjsnfab20f191474",
      "X-RapidAPI-Host": "corona-virus-world-and-india-data.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {}
};

export const fetchDailyData = async () => {
  const options = {
    method: "GET",
    url: "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india_timeline",
    headers: {
      "X-RapidAPI-Key": "47072f9a9cmsh08b0805cad6b7eap1e360bjsnfab20f191474",
      "X-RapidAPI-Host": "corona-virus-world-and-india-data.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.dailyconfirmed,
      deaths: dailyData.dailydeceased,
      date: dailyData.date,
    }));
    return modifiedData;
  } catch (error) {}
};

// export const fetchCountries = async () => {
//   const country_stat = data.country_stat;
//   const countries = country_stat.map((country) => country.country_name);
//   return countries;
// };
