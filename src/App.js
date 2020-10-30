import useState from 'react'
import './App.css'

import Welcome from './Welcome'

const App = () => {
	const [score, setScore] = useState(0)
	const [difficulty, setDifficulty] = useState('easy')

	return (
		<div className='App'>
			main app
		</div>
	)
}

export default App