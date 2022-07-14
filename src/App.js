import './App.css';
import {Header} from "./screens/Header/Header";
import {useState, useEffect} from "react";
import {Convert} from "./screens/Convert/Convert";

function App() {
    const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'

    const [data, setData] = useState(0)
    const [error, serError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setData(result)
                },

                (error) => {
                    setIsLoaded(true)
                    serError(error)
                }
            )

    }, [])

    // if (error) {
    //     console.log(`GET request (App) >>> Error >> ${error.message}`)
    // } else if (!isLoaded) {
    //     console.log('GET request (App) >>> Loading...')
    // } else {
    //     console.log(`GET request (App) >>> Complete`)
    // }

    return (
        <div className="App">
            <Header data={data}/>
            <Convert currencies={data}/>
        </div>
    );
}

export default App;
