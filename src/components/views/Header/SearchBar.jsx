import React, { useState, useContext } from 'react'
import { API_MAIN_URL } from '../../../config/config'
import { GlobalContext } from '../../global/context/GlobalState'
import {
	Grid,
	InputBase,
	makeStyles,
	Paper,
	Typography,
	Button,
	FormControl,
	Box,
	Select,
	MenuItem
} from '@material-ui/core'
import { fade } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

// Defining some style
const useStyle = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main
	},
	inputInput: {
		position: 'relative',
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		color: theme.palette.common.white
	},
	searchGrid: {
		[theme.breakpoints.down('xs')]: {
			width: '90vw'
		},
		minWidth: '259px'
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		color: theme.palette.common.white
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},

	searchButton: {
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(2)
		}
	}
}))

const SearchBar = () => {
	// Injecting defined style with "classes" object by useStyles()
	const classes = useStyle()

	// Importing required states
	const { fetchMovies } = useContext(GlobalContext)

	// state for form to use in url
	const [titleSearch, setTitleSearch] = useState('')

	// state for form to use in url
	const [yearSearch, setYearSearch] = useState('')

	// state for form to use in url
	const [type, setType] = useState('')

	const handleChange = (event) => {
		setType(event.target.value)
	}

	// submit form function to fetch created url
	const handleSubmit = (event) => {
		event.preventDefault()
		const titleInput = event.target.elements['titleSearch'].value
		const yearInput = event.target.elements['yearSearch'].value
		const typeInput = event.target.elements['typeSearch'].value

		const url = `${API_MAIN_URL}&s=${titleInput}&y=${yearInput}&type=${typeInput}`
		console.log(`url to fetch is ${url}`)

		fetchMovies(url)
	}

	return (
		<form onSubmit={handleSubmit}>
			<Grid container component={Box} my={1}>
				<Grid item container sm={10} spacing={1} justify="space-evenly">
					<Grid item className={classes.searchGrid}>
						<Paper className={classes.root}>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<FormControl style={{ display: 'flex', flexGrow: 1 }}>
									<InputBase
										placeholder="Search by Title…"
										required
										name="titleSearch"
										classes={{
											input: classes.inputInput
										}}
										inputProps={{
											'aria-label': 'search'
										}}
										value={titleSearch}
										onChange={(event) => setTitleSearch(event.target.value)}
									/>
								</FormControl>
							</div>
						</Paper>
					</Grid>
					<Grid item className={classes.searchGrid}>
						<Paper className={classes.root}>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<FormControl style={{ display: 'flex', flexGrow: 1 }}>
									<InputBase
										placeholder="Search by Year..."
										name="yearSearch"
										classes={{
											input: classes.inputInput
										}}
										inputProps={{
											'aria-label': 'search',
											type: 'number'
										}}
										value={yearSearch}
										onChange={(event) => setYearSearch(event.target.value)}
									/>
								</FormControl>
							</div>
						</Paper>
					</Grid>
					<Grid item className={classes.searchGrid}>
						<Paper className={classes.root}>
							<div className={classes.search}>
								<FormControl
									style={{ display: 'flex', justifyContent: 'space-between' }}>
									<div className={classes.searchIcon}>
										<SearchIcon />
									</div>
									<Select
										name="typeSearch"
										value={type}
										onChange={handleChange}
										input={
											<InputBase
												classes={{
													input: classes.inputInput
												}}
											/>
										}>
										<MenuItem value="">
											<em>No Type</em>
										</MenuItem>
										<MenuItem value={'movie'}>Movie</MenuItem>
										<MenuItem value={'series'}>Series</MenuItem>
										<MenuItem value={'episode'}>Episode</MenuItem>
										<MenuItem value={'game'}>Game</MenuItem>
									</Select>
								</FormControl>
							</div>
						</Paper>
					</Grid>
				</Grid>
				<Grid
					item
					sm={2}
					container
					justify="center"
					alignItems="center"
					className={classes.searchButton}>
					<Button variant="outlined" color="primary" type="submit">
						<Typography variant="overline" noWrap>
							Search
						</Typography>
					</Button>
				</Grid>
			</Grid>
		</form>
	)
}

export default SearchBar
