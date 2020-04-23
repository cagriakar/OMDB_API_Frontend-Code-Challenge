import React, { createContext, useReducer } from 'react'
import { fetcher } from '../../../assets/fetcher'

import AppReducer from '../reducer/AppReducer.jsx'

// Initial State
const initialState = {
	movies: [],
	favorites: localStorage,
	error: null,
	loading: true,
	isOnFavoritePage: true
}

// Create Context
const GlobalContext = createContext(initialState)

//Provider component
function GlobalProvider(props) {
	const [state, dispatch] = useReducer(AppReducer, initialState)

	// Actions
	async function fetchMovies(url) {
		const response = await fetcher(url)

		//Sometimes duplicated movies given by API response, below handling this issue
		const correctedResponse =
			response &&
			Object.values(
				response.Search.reduce((newDatas, item) => {
					const { imdbID } = item
					newDatas[imdbID] = item
					return newDatas
				}, {})
			)

		try {
			// Due to there is no direct error response from API, check if response.Response true | false
			response.Response === 'True'
				? dispatch({
						type: 'FETCH_MOVIES',
						payload: correctedResponse
				  })
				: dispatch({
						type: 'FETCH_ERROR',
						payload: '',
						errorPayload: response.Error
				  })
		} catch (error) {
			// Error handling arised from fetcher function
			dispatch({
				type: 'FETCH_ERROR',
				errorPayload: 'Fetcher failed'
			})
		}
	}

	async function addFavorite(movieID, data) {
		// save movie into localStorage with JSON formatt value
		localStorage.setItem(movieID, JSON.stringify(data))
		dispatch({
			type: 'FAVORITE_ACTION',
			payload: localStorage
		})
	}

	async function removeFavorite(movieID) {
		// remove movie from localStorage with given ID
		localStorage.removeItem(movieID)
		dispatch({
			type: 'FAVORITE_ACTION',
			payload: localStorage
		})
	}

	// for SearchBar toggle functionallity
	async function setOnFavoritePage() {
		dispatch({
			type: 'FAVORITE_PAGE',
			payload: true
		})
	}
	// for SearchBar toggle functionallity
	async function setOffFavoritePage() {
		dispatch({
			type: 'FAVORITE_PAGE',
			payload: false
		})
	}

	return (
		// passing all states into provider to use globally
		<GlobalContext.Provider
			value={{
				movies: state.movies,
				loading: state.loading,
				error: state.error,
				favorites: state.favorites,
				isOnFavoritePage: state.isOnFavoritePage,
				fetchMovies,
				addFavorite,
				removeFavorite,
				setOnFavoritePage,
				setOffFavoritePage
			}}>
			{props.children}
		</GlobalContext.Provider>
	)
}

export { GlobalContext, GlobalProvider }
