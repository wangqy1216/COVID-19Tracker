import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData, fetchDailyData } from './api';

import WebMap from './components/WebMap/WebMap';

class App extends React.Component {
    state = {
        data: {},
        country: ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        
        this.setState({ data : fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedGlobalData = await fetchData();
        const fetchedData = await fetchData(country);

        console.log(fetchedGlobalData);
        console.log(fetchedData);
        console.log(country);

        if( country !== "global" ){
            this.setState({ data: fetchedData, country: country});
        } else {
            this.setState({ data : fetchedGlobalData, country: '' });
            console.log(this.state.country);
        }
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <Cards data = { this.state.data }/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
                <div className="test" style={{width: 500, height: 500}} >
                    <WebMap />
                </div>
            </div>
        )
    }
}

export default App;