import { IAnecdoteProps } from '../ifx'

const Anecdote = ({ anecdote }: IAnecdoteProps) => {
  return (
    <div>
      <h3>
        {anecdote?.content} by {anecdote?.author}
      </h3>
      <div> has {anecdote?.votes} votes</div>
      <div> for more info see <a href={anecdote?.info}> {anecdote?.info} </a></div>
    </div>
  )
}

export default Anecdote
