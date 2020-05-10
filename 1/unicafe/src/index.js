import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)
const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const avg = (props.good - props.bad) / total || 0
  const perc = ((props.good / total) * 100)+'%' || 100+'%'

  if(props.good === 0 && props.neutral === 0 && props.bad === 0)
    return <p>No feedback given</p>

  return(
    <div>
      <table>
        <tbody>
          <Statistic text='good' value={props.good}/>
          <Statistic text='neutral' value={props.neutral}/>
          <Statistic text='bad' value={props.bad}/>
          <Statistic text='all' value={total}/>
          <Statistic text='average' value={avg}/>
          <Statistic text='positive' value={perc}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handle}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handle={() => {setGood(good + 1)}} text='good'/>
      <Button handle={() => {setNeutral(neutral + 1)}} text='neutral'/>
      <Button handle={() => {setBad(bad + 1)}} text='bad'/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)