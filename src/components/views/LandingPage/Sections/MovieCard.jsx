import React, { useRef, useState, useContext } from 'react'
import useSWR from 'swr'
import Reward from 'react-rewards'
import { makeStyles } from '@material-ui/styles'
import {
	Grid,
	Card,
	CardMedia,
	CardActions,
	Typography,
	Button,
	Container,
	Paper,
	Snackbar,
	Slide
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { FavoriteRounded, FavoriteBorderRounded } from '@material-ui/icons'
import CheckIcon from '@material-ui/icons/Check'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import { API_MAIN_URL } from '../../../../config/config'
import { fetcher } from '../../../../assets/fetcher'
import { GlobalContext } from '../../../global/context/GlobalState'
import noImage from '../../../../assets/noImage.png'
import LoadingMovieCard from './LoadingMovieCard'

// Defining some style
const useStyle = makeStyles((theme) => ({
	cardBorderPrimary: {
		border: '2px solid',
		borderColor: theme.palette.primary.main
	},
	cardBorderSecondary: {
		border: '2px solid',
		borderColor: theme.palette.secondary.main
	}
}))

const MovieCard = ({ movieID }) => {
	// Injecting defined style with "classes" object by useStyles()
	const classes = useStyle()

	// Importing required states
	const { removeFavorite, addFavorite } = useContext(GlobalContext)

	// Check if movieID matching with any localStorage keys
	const initialFavoriteStatus = new Set(Object.keys(localStorage)).has(movieID)

	// state for favorited or not
	const [isFavorite, setIsFavorite] = useState(initialFavoriteStatus)

	// state for snackBar
	const [open, setOpen] = useState(false)

	// ref for react-reward functionality
	let rewardRef = useRef()

	// url for fetching API by imdbID by usin SWR custom-hook
	const url = API_MAIN_URL + '&i=' + movieID

	const { data, error } = useSWR(url, fetcher)

	// Error handling arised from fetcher function in case of any (almost impossible)
	if (error)
		return (
			<Container>
				<Paper elevation={5}>
					There is an error : {error} <br /> Please try again later...
				</Paper>
			</Container>
		)

	// Check if still waiting response from API
	if (!data) return <LoadingMovieCard />

	// Error handling in case of any (almost impossible)
	if (data.Error)
		return (
			<Container>
				<Paper elevation={5}>
					There is an error : {data.Error} <br /> Please try to be more specific when
					searching or try again later...
				</Paper>
			</Container>
		)

	// Destructuring "data" response for easy reference
	const { Title, Year, Genre, Poster, imdbRating, Type } = data

	// Add | Remove favorite function
	const handleClick = () => {
		setOpen(true)
		if (isFavorite) {
			removeFavorite(movieID)
			rewardRef.punishMe()
		} else {
			addFavorite(movieID, data)
			rewardRef.rewardMe()
		}
		setIsFavorite(!isFavorite)
	}

	// Handling Closure for snackBar
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card className={!isFavorite ? classes.cardBorderSecondary : classes.cardBorderPrimary}>
				<Reward
					ref={(ref) => {
						rewardRef = ref
					}}
					type="emoji"
					config={{
						elementSize: 15,
						elementCount: 20,
						emoji: ['💕', '💖', '💖', '🎉', '✨', '👍', '💖']
					}}>
					<Button
						variant={!isFavorite ? 'outlined' : 'contained'}
						color={!isFavorite ? 'secondary' : 'primary'}
						size="small"
						onClick={handleClick}
						fullWidth
						startIcon={
							isFavorite ? (
								<FavoriteRounded fontSize="small"></FavoriteRounded>
							) : (
								<FavoriteBorderRounded fontSize="small" />
							)
						}
						style={{ borderRadius: 0 }}>
						{isFavorite ? (
							<Typography variant="overline">In Your Favorite List</Typography>
						) : (
							<Typography variant="overline">Add to Your Favorite List</Typography>
						)}
					</Button>
				</Reward>
				<Snackbar
					open={open}
					autoHideDuration={2000}
					onClose={handleClose}
					TransitionComponent={Slide}
					TransitionProps={{ direction: 'up' }}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right'
					}}>
					<Alert
						onClose={handleClose}
						severity={!isFavorite ? 'warning' : 'info'}
						iconMapping={
							({
								warning: <InfoOutlinedIcon fontSize="inherit" />
							},
							{
								info: <CheckIcon fontSize="inherit" />
							})
						}
						elevation={12}
						variant="filled">
						{!isFavorite ? 'Removed from your Favorite' : 'Added to your Favorite'}
					</Alert>
				</Snackbar>
				<CardMedia component="img" src={Poster === 'N/A' ? noImage : Poster} />
				<CardActions>
					<Grid container justify="space-between">
						<Grid item container>
							<Typography variant="body1" component="h3" style={{ fontWeight: 550 }}>
								{Title}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="body2" color="textSecondary">
								Released @ {Year}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="body2" color="textSecondary">
								|
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="body2" color="textSecondary">
								Type: {Type}
							</Typography>
						</Grid>
						<Grid item container>
							<Typography variant="body2" color="textSecondary">
								Genre: {Genre}
							</Typography>
						</Grid>
						<Grid item container justify="center">
							<Typography
								variant="body2"
								color="textSecondary"
								style={{ fontWeight: 700 }}>
								IMDB: {imdbRating}
							</Typography>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		</Grid>
	)
}

export default MovieCard
