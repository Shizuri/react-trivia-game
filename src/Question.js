import { useEffect, useContext, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Context } from './context'

import QuestionBoolean from './QuestionBoolean'
import QuestionMulti from './QuestionMulti'

// import './App.css'

const Question = props => {
    // Routing data needed to get the game difficulty
    // Done this way to prevent direct page loading from the URL
    const routeData = useLocation()
    // Global state of the question
    const { question, setQuestion } = useContext(Context)
    const [loaded, setLoaded] = useState(false) // Questions load state

    const history = useHistory()

    useEffect(() => {
        // Update the document title
        document.title = 'Question'
    }, [])

    // On every component mount get a new token if required and then get the cards
    useEffect(() => {
        // First check if the user got here in the normal app flow, not just by putting in the URL in the browser
        if (routeData.state !== undefined) {
            // This prevents a memory leak scenario on a fast component unmount
            let isMounted = true

            const token = sessionStorage.getItem('token')
            console.log('token: ', token)

            const getToken = () => {
                // GET Request.
                fetch(`https://opentdb.com/api_token.php?command=request`)
                    // Handle success
                    // Convert to json
                    .then(response => {
                        if (isMounted) {
                            return response.json()
                        }
                    })
                    .then(data => {
                        if (isMounted) {
                            console.log('token data:', data)
                            if (data.response_code === 0) {
                                console.log(`Setting new token ${data.token}`)
                                sessionStorage.setItem('token', data.token)
                            }
                        }
                    })
                    // Catch errors
                    .catch(error => {
                        if (isMounted) {
                            console.log('Request Failed with error: ', error)
                        }
                    })

            }

            // Load a question from API
            const getQuestion = () => {
                // !!! The API token system does not know how many questions it has left (found out this the hard way)
                // Only one question will be pulled at a time because if you try to pull more questions than there are available
                // the API will send an empty token error without even giving back any results
                fetch(`https://opentdb.com/api.php?amount=1&difficulty=${routeData.state.difficulty}&token=${token}`)
                    // Handle success
                    // Convert to json
                    .then(response => {
                        if (isMounted) {
                            return response.json()
                        }
                    })
                    .then(data => {
                        if (isMounted) {
                            console.log('DATA: ', data)
                            if (data.response_code === 0) {
                                setQuestion(data.results) // Set global state cards
                                setLoaded(true) // Questions are loaded
                            }
                            // If all of the questions have been used, reset the token
                            if (data.response_code === 4) {
                                console.log(`Token Empty, resting`)
                                resetToken(token)
                            }
                        }
                    })
                    // Catch errors
                    .catch(error => {
                        if (isMounted) {
                            console.log('Request Failed with error: ', error)
                        }
                    })
            }

            // Reset token in the case of response_code 4
            const resetToken = token => {
                console.log('in resetToken: ', token)
                fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
                    // Handle success
                    // Convert to json
                    .then(response => {
                        if (isMounted) {
                            return response.json()
                        }
                    })
                    .then(data => {
                        if (isMounted) {
                            console.log('RESET token data:', data)
                            getQuestion()
                        }
                    })
                    // Catch errors
                    .catch(error => {
                        if (isMounted) {
                            console.log('Request Failed with error: ', error)
                        }
                    })


            }

            // Get a new session token on a new session
            if (token === null) {
                getToken()
            }
            // Get the question
            if (token !== null) {
                getQuestion()
            }

            // Set isMounted to false so that the fetch request does not happen
            // This prevents a memory leak scenario on a fast component unmount
            return () => { isMounted = false }
        }
    }, [routeData.state, setQuestion])

    return (
        <div className='Question'>
            {routeData.state === undefined ?
                <div><h1>Invalid path</h1></div>
                :
                <div>
                    {loaded ?
                        <div> one more ternary for multi or boolean HERE
                            <br />
                            <button onClick={history.goBack}>back</button>
                        </div>
                        :
                        // Loading animation
                        <div>Loading...</div>
                        // <div className='loadingio-spinner-spinner-ssc7g0lctwf'><div className='ldio-9mbi9huikr'>
                        //     <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        // </div></div>
                    }
                </div>
            }

        </div>
    )
}

export default Question