import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import UserPage from './pages/UserPage';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';

function App() {
	return (
		<div className='app'>
			<BrowserRouter>
				<Header />
				<Switch>
					{/* Redirects to a user page on project start */}
					<Route exact path='/'>
						<Redirect to='/user/18' />
					</Route>
					<Route path='/user/:id' component={UserPage} />
					<Route component={ErrorPage} />
					
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
