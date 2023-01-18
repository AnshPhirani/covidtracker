import React, { Component } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";

import styles from "./App.module.css";
import coronaImage from "./images/image.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: { countries_stat: [] },
      country: "",
      countryData: {
        data: { confirmed: 0, recovered: 0, deaths: 0 },
        lastUpdate: new Date(),
      },
    };
  }

  handleCountryChange = (country) => {
    if (!country) {
      // global cases
      const confirmed = parseInt(
        this.state.data.world_total.total_cases.replaceAll(",", "")
      );
      const recovered = parseInt(
        this.state.data.world_total.total_recovered.replaceAll(",", "")
      );
      const deaths = parseInt(
        this.state.data.world_total.total_deaths.replaceAll(",", "")
      );
      this.setState({
        ...this.state,
        country: "",
        countryData: {
          data: { confirmed, recovered, deaths },
          lastUpdate: new Date(),
        },
      });
      return;
    }

    const newData = this.state.data.countries_stat.filter((item) => {
      return item.country_name === country;
    })[0];

    const confirmed = parseInt(newData.cases.replaceAll(",", ""));
    const recovered = parseInt(newData.total_recovered.replaceAll(",", ""));
    const deaths = parseInt(newData.deaths.replaceAll(",", ""));
    this.setState({
      ...this.state,
      country,
      countryData: {
        data: { confirmed, recovered, deaths },
        lastUpdate: new Date(),
      },
    });
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    const confirmed = parseInt(
      fetchedData.world_total.total_cases.replaceAll(",", "")
    );
    const recovered = parseInt(
      fetchedData.world_total.total_recovered.replaceAll(",", "")
    );
    const deaths = parseInt(
      fetchedData.world_total.total_deaths.replaceAll(",", "")
    );
    this.setState({
      data: fetchedData,
      country: "",
      countryData: {
        data: { confirmed, recovered, deaths },
        lastUpdate: new Date(),
      },
    });
  }

  render() {
    const { data, country, countryData } = this.state;

    return (
      <div className={styles.container}>
        <img src={coronaImage} alt="COVID-19" className={styles.image} />
        <Cards countryData={countryData} country={country} />
        <CountryPicker
          data={data}
          handleCountryChange={this.handleCountryChange}
        />
        <Chart countryData={countryData} country={country} />
      </div>
    );
  }
}

export default App;
