import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
import deepPurple from '@material-ui/core/colors/deepPurple'
import orange from '@material-ui/core/colors/orange'

import NavBar from './views/Header/NavBar'
import LandingPage from './views/LandingPage/LandingPage'
import Footer from './views/Footer/Footer'
import FavoritesPage from './views/FavoritesPage/FavoritesPage'
import { GlobalProvider } from './global/context/GlobalState'

const theme = createMuiTheme({
	palette: {
		primary: deepPurple,
		secondary: orange,
		info: deepPurple,
		warning: orange
	}
})

const App = () => {
	return (
		// Providing all the states in GlobalState file
		<ThemeProvider theme={theme}>
			{/* hHndling margin problem */}
			<CssBaseline />
			<GlobalProvider>
				<Router>
					<NavBar />
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/favorite" component={FavoritesPage} />
					</Switch>
				</Router>
				<Footer />
			</GlobalProvider>
		</ThemeProvider>
	)
}

export default App
