// This component is displayed if the user answers incorrectly
import { Link, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Context } from './context'
import './IncorrectAnswer.css'

const IncorrectAnswer = () => {
    // Needed to chain all the components with the difficulty property so that the user is prevented from simply entering a URL
    const routeData = useLocation()

    // Get the score  from the context API
    const { score, setScore } = useContext(Context)

    // State that holds the transition of the thumbs down icon to the score screen
    const [showThumbsDown, setShowThumbsDown] = useState(true)

    useEffect(() => {
        // Once this component dismounts, reset the score to 0
        return () => setScore(0)
    }, [setScore])

    useEffect(() => {
        // Update the document title
        document.title = 'You lost. Try again?'
        // Transition the thumbs down icon to the score screen
        const thumbsDownTimer = setTimeout(() => setShowThumbsDown(false), 1000)
        // Clear the timer if the component is dismounted
        return () => clearTimeout(thumbsDownTimer)
    }, [])

    return (
        <div className='IncorrectAnswer'>
            {routeData.state === undefined ?
                <div className='IncorrectAnswer-no-cheating'>Please play the game from the start. Just going to a URL does not work.</div>
                :
                <div className='IncorrectAnswer-container'>
                    <div style={showThumbsDown ? { display: 'flex' } : { display: 'none' }} className='IncorrectAnswer-thumbs-down-container'>
                        <div className='IncorrectAnswer-thumbs-down-circle'>
                            <i className='IncorrectAnswer-thumbs-down fas fa-thumbs-down'></i>
                        </div>
                    </div>
                    <div style={!showThumbsDown ? { display: 'flex' } : { display: 'none' }} className='IncorrectAnswer-score-container'>
                        <div className='IncorrectAnswer-score-circle'>
                            <div className='IncorrectAnswer-score'>{score}</div>
                        </div>
                    </div>
                    <div className='IncorrectAnswer-again-button-container'>
                        <Link style={!showThumbsDown ? { display: 'block' } : { display: 'none' }} className='IncorrectAnswer-again-button' to='/'>
                            Again <i className='IncorrectAnswer-reload-icon fas fa-arrow-right'></i></Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default IncorrectAnswer