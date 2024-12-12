import { useState } from 'react'
import './App.css'

const StatisticsLine = ({ text, value }) => (
    <tr>
        <td align="left"> {text} </td>
        <td align="right"> {value} </td>
    </tr>
)

const Statistics = ({ good, bad, neutral }) => {
    const total = bad + neutral + good
    const avg = (bad * -1 + neutral * 0 + good * 1) / total
    const pos_pct = good * 100 / total
    if (total == 0) {
        return (
            <div>
                <h2>Statistics</h2>
                <p> No feedback given </p>
            </div>
        )
    }
    return (
        <div>
            <h2>Statistics</h2>
            <table align="center" width="200px">
                <tbody>
                    <StatisticsLine text="good" value={good} />
                    <StatisticsLine text="neutral" value={neutral} />
                    <StatisticsLine text="bad" value={bad} />
                    <StatisticsLine text="all" value={total} />
                    <StatisticsLine text="average" value={avg.toFixed(2)} />
                    <StatisticsLine text="positive" value={pos_pct.toFixed(2) + " %"} />
                </tbody>
            </table>
        </div>
    )
}

const Button = ({ value, text, setValue }) => {
    const onClick = () => { setValue(value + 1) }
    return (
        <button onClick={onClick}> {text}</button>
    )
}

const GiveFeedBack = ({ good, bad, neutral, setGood, setBad, setNeutral }) => {
    return (
        <div>
            <h2>Give Feedback</h2>
            <Button value={good} text="good" setValue={setGood} />
            <Button value={neutral} text="neutral" setValue={setNeutral} />
            <Button value={bad} text="bad" setValue={setBad} />
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <GiveFeedBack
                good={good} bad={bad} neutral={neutral}
                setGood={setGood} setBad={setBad} setNeutral={setNeutral}
            />
            <Statistics good={good} bad={bad} neutral={neutral} />
        </>
    )
}

export default App
