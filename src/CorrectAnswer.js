import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import './App.css'

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
                <div>Please play the game from the start. Just going to a URL does not work.</div>
                :
                <div>
                    <div>Correct Answer!!!</div>
                    <Link to={{
                        pathname: '/question',
                        state: { difficulty: routeData.state.difficulty }
                    }}>Next</Link>
                </div>
            }
        </div>
    )
}

export default CorrectAnswer