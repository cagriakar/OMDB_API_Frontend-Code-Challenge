import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../global/context/GlobalState'
import MovieCard from './Sections/MovieCard'
import { Grid, Container, Paper, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

// Defining some style
const useStyle = makeStyles((theme) => ({
	loadingPaper: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		padding: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3)
		},
		marginTop: theme.spacing(20),
		marginBottom: theme.spacing(20)
	},
	errorPaper: {
		backgroundColor: theme.palette.warning.main,
		color: theme.palette.primary.contrastText,
		padding: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3)
		},
		marginTop: theme.spacing(20),
		marginBottom: theme.spacing(20)
	}
}))

const LandingPage = () => {
	// Injecting defined style with "classes" object by useStyles()
	const classes = useStyle()

	// Importing required states
	const { movies, loading, error, setOnFavoritePage } = useContext(GlobalContext)

	// Changing isOnFavoritePage value to true in useEffect
	useEffect(() => {
		setOnFavoritePage()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Check if fetching still continue | not started
	if (loading) {
		return (
			<Container component={Box} mb={2}>
				<Paper component={Box} mt={2} elevation={10} className={classes.loadingPaper}>
					<Typography variant="subtitle1">
						Please type any title, released year or select type in search bar...
					</Typography>
				</Paper>
			</Container>
		)
	}

	// Error handling
	if (error) {
		return (
			<Container component={Box} mb={2}>
				<Paper component={Box} mt={2} elevation={10} className={classes.errorPaper}>
					<Typography variant="subtitle2">There is an error : {error}</Typography>
					<Typography variant="subtitle1">
						Please try to be more specific when searching or try again later...
					</Typography>
				</Paper>
			</Container>
		)
	}

	console.log(movies)
	return (
		<Grid container>
			<Grid item xs={1} />
			<Grid item xs={10} container>
				<Grid item container spacing={2}>
					{movies &&
						movies.map((movie) => (
							<MovieCard key={movie.imdbID} movieID={movie.imdbID} />
						))}
				</Grid>
			</Grid>
			<Grid item xs={1} />
		</Grid>
	)
}

export default LandingPage
