// Display component. There is no direct route to it.
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from './context'
// import './App.css'

const QuestionBoolean = props => {
    // Extract the props from the Question component
    const { question, correctAnswer, difficulty } = props

    // Get the setScore function from the context API
    const { setScore } = useContext(Context)

    // React router history hook. Needed for transitioning without the user clicking on a link
    const history = useHistory()

    const handleClick = event => {
        const text = event.target.innerText

        if (text === correctAnswer) {
            // If the answer is correct, increment the score in the global state
            setScore(prevScore => prevScore += 1)
            history.push({
                pathname: '/correct-answer',
                state: { difficulty: difficulty }
            })
        } else {
            history.push({
                pathname: '/incorrect-answer',
                state: { difficulty: difficulty }
            })
        }
        // The difficulty is purposefully being passed down from one component to an other instead of being kept in the global state.
        // This is so that the user will be prevented from simply going directly to a URL
    }

    return (
        <div className='QuestionBoolean'>
            <div>{question}</div>
            <div onClick={handleClick}>True</div>
            <div onClick={handleClick}>False</div>
        </div>
    )
}

export default QuestionBoolean