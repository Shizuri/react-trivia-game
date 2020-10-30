// The Welcome component is the default route where the user is greeted and presented with a choice of game difficulty
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import './App.css'

const Welcome = props => {
	const [difficulty, setDifficulty] = useState('easy') // Store the game's difficulty state

	// Handle the radio button change
	const handleChange = event => {
		const { value } = event.target
		setDifficulty(value)
	}

	useEffect(() => {
        // Update the document title
		document.title = 'Welcome'
    }, [])

	return (
		<div className='Welcome'>
			<h1>TriviaTime</h1>
			<div>Pick your level of difficulty</div>

			<div>
				<label>
					<input
						type='radio'
						name='difficulty'
						value='easy'
						checked={difficulty === 'easy'}
						onChange={handleChange}
					/> Go easy on me
                </label>
				<br />
				<label>
					<input
						type='radio'
						name='difficulty'
						value='medium'
						checked={difficulty === 'medium'}
						onChange={handleChange}
					/> Bring it on
                </label>
				<br />
				<label>
					<input
						type='radio'
						name='difficulty'
						value='hard'
						checked={difficulty === 'hard'}
						onChange={handleChange}
					/> Insanity mode
                </label>
			</div>

			<Link to={{
				pathname: '/question',
				// The difficulty is purposefully being passed down from one component to an other instead of being kept in the global state.
				// This is so that the user will be prevented from simply going directly to a URL
				state: { difficulty: difficulty }
			}}>Play Now</Link>
		</div>
	)
}

export default Welcome