import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ name }) => {
    const [weather, setWeater] = useState({ current: '' })
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_ACCESS_KEY}&query=${name}`)
            .then((res) => setWeater(res.data))
    }, [name])
    console.log(weather)
    return(
    <div>
        {weather.current.temperature ? <p><b>temperature:</b> {weather.current.temperature} Celcius</p> : null}
        {weather.current.weather_icons ? <img src={weather.current.weather_icons[0]} alt={`Weather in ${name}`} /> : null}
        {weather.current.wind_speed ? <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p> : null}
    </div>
    )
}

export default Weather