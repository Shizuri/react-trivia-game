// This component provides global state management for the app
import React, { useState } from 'react'
const Context = React.createContext()

const ContextProvider = props => {
    const [score, setScore] = useState(0) // Keep the game score
    const [question, setQuestion] = useState({}) // Fetched cards

    return (
        <Context.Provider value={{
            score,
            setScore,
            question,
            setQuestion
        }}>
            {props.children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }