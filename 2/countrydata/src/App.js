import React, { useState, useEffect } from 'react';
import ShowCountries from './components/ShowCountries'
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((res) => {
        setCountries(res.data)
      })
  }, [])

  return(
    <div>
      <div>
        find counteries <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
      </div>
      <div>
        <ShowCountries countries={countries} filter={filter}/>
      </div>
    </div>
  )
}


export default App;
