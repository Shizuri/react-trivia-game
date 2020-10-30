import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import './App.css'

const Welcome = props => {
	// console.log('props: ', props) // DELETE THIS
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
			<p>Pick your level of difficulty</p>

			<div>
				<label>
					<input
						type='radio'
						name='difficulty'
						value='easy'
						checked={difficulty === 'easy'}
						onChange={handleChange}
					/> Easy
                </label>
				<br />
				<label>
					<input
						type='radio'
						name='difficulty'
						value='medium'
						checked={difficulty === 'medium'}
						onChange={handleChange}
					/> Medium
                </label>
				<br />
				<label>
					<input
						type='radio'
						name='difficulty'
						value='hard'
						checked={difficulty === 'hard'}
						onChange={handleChange}
					/> Hard
                </label>
			</div>

			<Link to={{
				pathname: '/question',
				state: { difficulty: difficulty }
			}}>Play Now</Link>
		</div>
	)
}

export default Welcome