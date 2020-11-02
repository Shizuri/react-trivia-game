// This component provides global state management for the app
import React, { useState } from 'react'
const Context = React.createContext()

const ContextProvider = props => {
    const [score, setScore] = useState(0) // Keep the game score
    const [question, setQuestion] = useState({}) // Fetched cards

    return (
        <Context.Provider value={{
            // Provide these values. They are object key value pares, same as if "score: score" was written
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