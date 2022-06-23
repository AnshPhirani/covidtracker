import React, { Component } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";

import styles from "./App.module.css";
import coronaImage from "./images/image.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      country: "",
    };
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img src={coronaImage} alt="COVID-19" className={styles.image} />
        <Cards data={data} country={country} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
