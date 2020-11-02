// The App component is the main hub where React router does the switching
import { Route, Switch } from 'react-router-dom'

import './App.css'

import Welcome from './Welcome'
import Question from './Question'
import CorrectAnswer from './CorrectAnswer'
import IncorrectAnswer from './IncorrectAnswer'
import NotFound from './NotFound'

const App = () => {
	return (
		<div className='App'>
			{/* Route the user to the exact path */}
			<Switch >
				<Route exact path='/'>
					<Welcome />
				</Route>
				<Route exact path='/question'>
					<Question />
				</Route>
				<Route exact path='/correct-answer'>
					<CorrectAnswer />
				</Route>
				<Route exact path='/incorrect-answer'>
					<IncorrectAnswer />
				</Route>
				{/* In case the user enter an incorrect path, lead them here */}
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</div>
	)
}

export default App