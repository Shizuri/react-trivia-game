// Display component. There is no direct route to it. If the APi provides a multiple choice question the Question.js component
// will call this one to display the data
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from './context'

import './QuestionBoolean.css'

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
            // Send the user to the correct location while also keeping the difficulty prop chain that prevents direct URL access
            history.push({
                pathname: '/correct-answer',
                state: { difficulty: difficulty }
            })
        } else {
            // Send the user to the correct location while also keeping the difficulty prop chain that prevents direct URL access
            history.push({
                pathname: '/incorrect-answer',
                state: { difficulty: difficulty }
            })
        }
        // The difficulty is purposefully being passed down from one component to an other instead of being kept in the global state.
        // This is so that the user will be prevented from simply going directly to a URL
    }

    // Helper function needed to format the question text that comes from the API with some HTML Entities
    const createMarkup = text => {
        return { __html: text };
    }

    return (
        <div className='QuestionBoolean'>
            <div className='QuestionBoolean-question' dangerouslySetInnerHTML={createMarkup(question)}></div>
            <div className='QuestionBoolean-answer-button' onClick={handleClick}>True</div>
            <div className='QuestionBoolean-answer-button' onClick={handleClick}>False</div>
        </div>
    )
}

export default QuestionBoolean