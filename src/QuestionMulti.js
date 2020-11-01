// Display component. There is no direct route to it.
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from './context'
import './QuestionMulti.css'

const QuestionMulti = props => {
    // Credit for this function at https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const shuffleArray = array => {
        let currentIndex = array.length, temporaryValue, randomIndex

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            // And swap it with the current element.
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }

    // Extract the props from the Question component
    const { question, incorrectAnswers, correctAnswer, difficulty } = props

    // Get the setScore function from the context API
    const { setScore } = useContext(Context)

    // Put all of the answers in an array and randomize its order
    const allAnswers = [...incorrectAnswers, correctAnswer]
    shuffleArray(allAnswers)

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

    // Helper function needed to format the question text that comes from the API with some HTML Entities
    const createMarkup = text => {
        return { __html: text };
    }

    return (
        <div className='QuestionMulti'>
            <div className='QuestionMulti-question' dangerouslySetInnerHTML={createMarkup(question)}></div>
            <ul className='QuestionMulti-answer-list'>
                {allAnswers.map(answer => <li className='QuestionMulti-answer-button' key={answer} onClick={handleClick}>{answer}</li>)}
            </ul>
        </div>
    )
}

export default QuestionMulti