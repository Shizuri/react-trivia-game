import { Link, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { Context } from './context'
// import './App.css'

const IncorrectAnswer = () => {
    // Needed to chain all the components with the difficulty property so that the user is prevented from simply entering a URL
    const routeData = useLocation()

    // Get the score  from the context API
    const { score, setScore } = useContext(Context)

    useEffect(() => {
        // Update the document title
        document.title = 'You lost :('
        // Once this component dismounts, reset the score to 0
        return () => setScore(0)
    }, [setScore])

    return (
        <div className='CorrectAnswer'>
            {routeData.state === undefined ?
                <div>Please play the game from the start. Just going to a URL does not work.</div>
                :
                <div>
                    <div>INCORRECT Answer!!!</div>
                    <div>Final score: {score}</div>
                    <Link to='/'>Again</Link>
                </div>
            }
        </div>
    )
}

export default IncorrectAnswer