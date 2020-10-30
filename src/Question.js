import { useEffect, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Context } from './context'

import QuestionBoolean from './QuestionBoolean' // Display component
import QuestionMulti from './QuestionMulti' // Display component

// import './App.css'

const Question = props => {
    // Routing data needed to get the game difficulty
    // Done this way to prevent direct page loading from the URL
    const routeData = useLocation()
    // Global state of the question
    const { question, setQuestion } = useContext(Context)
    const [loaded, setLoaded] = useState(false) // Token load state
    const [loadedToken, setLoadedToken] = useState(false) // Questions load state

    useEffect(() => {
        // Update the document title
        document.title = 'Question'
    }, [])

    // On every component mount get a new token if required and then get the cards
    useEffect(() => {
        // First check if the user got here in the normal app flow, not just by putting in the URL in the browser
        if (routeData.state !== undefined) {
            // Checking if the component is unmounted prevents a memory leak scenario on a fast component unmount
            let isMounted = true

            const token = sessionStorage.getItem('token')

            // Get a token
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
                            if (data.response_code === 0) {
                                // Save the data to sessionStorage
                                sessionStorage.setItem('token', data.token)
                                // Inform the state that the token is loaded so that this effect can be updated
                                setLoadedToken(true)
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

            // !!! The API token system does not know how many questions it has left (found out this the hard way).
            // Only one question will be pulled at a time because if you try to pull more questions than there are available
            // the API will send an empty token error without even giving back any results.
            const getQuestion = () => {
                // Because of API limitations (lack of number of remaining questions), only get one question at a time
                // The API handles the question not repeating by using their token system
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
                            if (data.response_code === 0) {
                                setQuestion(data.results[0]) // Set the question to global state
                                setLoaded(true) // Questions are loaded
                            }
                            // If all of the questions have been used, reset the token
                            if (data.response_code === 4) {
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
                            // Getting only 1 question at a time also ensures smooth behaviour if the API runs out of new questions
                            // and there is no chance of an infinite loop.
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
            // Because getting the data is an asynchronous function, this useEffect must also reload on changes in loadedToken.
            // Without it, if there is no token at start, the application never gets a question and is stuck at the loading screen.
            if (token !== null) {
                getQuestion()
            }

            // Set isMounted to false so that the fetch request does not happen
            // This prevents a memory leak scenario on a fast component unmount
            return () => { isMounted = false }
        }
    }, [routeData.state, setQuestion, loadedToken])

    return (
        <div className='Question'>
            {routeData.state === undefined ?
                <div>Please play the game from the start. Just going to a URL does not work.</div>
                :
                <div>
                    {loaded ?
                        question.type === 'boolean' ?
                            <QuestionBoolean
                                question={question.question}
                                correctAnswer={question.correct_answer}
                                incorrectAnswers={question.incorrect_answers}
                                difficulty={routeData.state.difficulty}
                            /> :
                            <QuestionMulti
                                question={question.question}
                                correctAnswer={question.correct_answer}
                                incorrectAnswers={question.incorrect_answers}
                                difficulty={routeData.state.difficulty}
                            />
                        // The difficulty is purposefully being passed down from one component to an other instead of being kept in the global state.
                        // This is so that the user will be prevented from simply going directly to a URL
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