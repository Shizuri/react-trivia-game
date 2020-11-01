// This component is displayed if the user answers correctly
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './CorrectAnswer.css'

const CorrectAnswer = props => {
    // Needed to chain all the components with the difficulty property so that the user is prevented from simply entering a URL
    const routeData = useLocation()

    useEffect(() => {
        // Update the document title
        document.title = 'Correct!'
    }, [])


    return (
        <div className='CorrectAnswer'>
            {routeData.state === undefined ?
                <div className='CorrectAnswer-no-cheating'>Please play the game from the start. Just going to a URL does not work.</div>
                :
                <div className='CorrectAnswers-container'>
                    <div className='CorrectAnswers-thumbs-up-container'>
                        <div className='CorrectAnswers-thumbs-up-circle'>
                            <i className='CorrectAnswers-thumbs-up fas fa-thumbs-up'></i>
                        </div>
                    </div>
                    <Link className='CorrectAnswers-next-button' to={{
                        pathname: '/question',
                        state: { difficulty: routeData.state.difficulty }
                    }}>Next
                    <i className='CorrectAnswers-right-arrow fas fa-arrow-right'></i>
                    </Link>
                </div>
            }
        </div>
    )
}

export default CorrectAnswer