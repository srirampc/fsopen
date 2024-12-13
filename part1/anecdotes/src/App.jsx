import { useState } from 'react'

const AnecdoteOfDay = ({ anecdotes, selected }) => (
    <div>
        <h1>Anecdote of the Day</h1>
        <p>
            {anecdotes[selected]}
            <br />
            <br />
        </p>
    </div>
)

const Button = ({ text, clickHandler }) => (
    <button onClick={clickHandler}> {text} </button>
)

const MostVoted = ({ votes, anecdotes }) => {

    let max_votes = votes[0]
    let arg_max = 0
    for (let index = 1; index < votes.length; index++) {
        if (votes[index] > max_votes) {
            arg_max = index
            max_votes = votes[index]
        }
    }
    return (
        <div>
            <h1>Most voted anecdote</h1>
            <p> {anecdotes[arg_max]} </p>
            <br/>
            <i> Has {max_votes} votes </i>
            <h1>Current Vote Status</h1>
            <p> Tally : {votes.join(',')} </p>
        </div>
    )
}
function App() {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const init_select = Math.floor(Math.random() * anecdotes.length)
    const [selected, setSelected] = useState(init_select)
    const [votes, updateVotes] = useState(Array(anecdotes.length).fill(0))

    const getNext = () => {
        const rand_select = Math.floor(Math.random() * anecdotes.length)
        // console.log("Get Random : ", rand_select)
        setSelected(rand_select)
    }

    const castVote = () => {
        // console.log("Selected : ", selected)
        const updated_votes = [...votes]
        updated_votes[selected] += 1
        // console.log("Updated Votes : ", updated_votes)
        updateVotes(updated_votes)
    }

    return (
        <>
            <AnecdoteOfDay anecdotes={anecdotes} selected={selected} />
            <div>
                    <Button text="next anecdote" clickHandler={getNext} />
                    <Button text="vote" clickHandler={castVote} />
            </div>
            <MostVoted votes={votes} anecdotes={anecdotes} />
        </>
    )
}

export default App
