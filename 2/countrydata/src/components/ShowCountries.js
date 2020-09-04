import React, { useState, useEffect } from 'react'
import Weather from './Weather'

const ShowCountries = ({ countries, filter }) => {
    const [chooseOne, setChooseOne] = useState()
    const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

    const Button = ({country}) => (
        <button onClick={() => setChooseOne(handleOne(country))}>show</button>
    )

    useEffect(() => {
        if(filteredCountries.length === 1)
            setChooseOne()
    },[filteredCountries])
    const handleTooMany = () => 'Too many matches, specify another filter'
    const handleOne = (country) => {
        return(<div>
                <h2>{country.name}</h2>
                <p>
                    capital {country.capital}<br />
                    population {country.population}
                </p>
                <h3>languages</h3>
                <ul>
                    {country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
                </ul>
                <img src={country.flag} alt={`flag of ${country.name}`} width="400" height="250"/>
                <h3>Weather in {country.name}</h3>
                <Weather name={country.name}/>
            </div>
        )
    }
    const handleFew = () => {
    return filteredCountries.map((country) => (<React.Fragment key={country.name}>{country.name } <Button country={country}/><br /></React.Fragment>))
    }

    return(
        <div>
            {filteredCountries.length > 10
            ? handleTooMany()
            : filteredCountries.length === 1 ? handleOne(filteredCountries[0])
            : handleFew()}
            <div>{chooseOne}</div>
        </div>
    )
}

export default ShowCountries;
