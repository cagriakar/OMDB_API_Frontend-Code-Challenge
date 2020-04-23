function AppReducer(state, action) {
	switch (action.type) {
		case 'FETCH_MOVIES':
			return {
				...state,
				loading: false,
				error: null,
				movies: action.payload
			}
		case 'CHANGE_API_URL':
			return {
				...state,
				url: action.payload
			}
		case 'FAVORITE_ACTION':
			return {
				...state,
				favorites: action.payload
			}
		case 'FAVORITE_PAGE':
			return {
				...state,
				isOnFavoritePage: action.payload
			}
		case 'FETCH_ERROR':
			return {
				...state,
				loading: false,
				error: action.errorPayload,
				movies: action.payload
			}
		default:
			return state
	}
}

export default AppReducer
