import React, { useContext, useEffect } from 'react'
import {
	TableHead,
	TableBody,
	TableRow,
	TableContainer,
	Table,
	Paper,
	TableCell,
	Container,
	Box,
	Typography,
	Divider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { GlobalContext } from '../../global/context/GlobalState'
import RowInfos from './RowInfos'

// Defining some style
const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 720,
		border: '2px solid',
		borderColor: theme.palette.primary.dark
	},
	tableHead: {
		backgroundColor: theme.palette.primary.dark
	},
	tableHeadCell: {
		color: theme.palette.secondary.light
	},
	loadingPaper: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		padding: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3)
		},
		marginTop: theme.spacing(20),
		marginBottom: theme.spacing(20),
		textAlign: 'center'
	}
}))

const FavoritesPage = () => {
	// Injecting defined style with "classes" object by useStyles()
	const classes = useStyles()

	// Importing required states
	const { favorites, setOffFavoritePage } = useContext(GlobalContext)

	// Changing isOnFavoritePage value to true in useEffect
	useEffect(() => {
		setOffFavoritePage()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Defining array from localStorage keys to iterate through them
	const iterations = Object.keys(favorites)

	// Defining array for header colums in table
	const columns = ['Title', 'imdbRating', 'Year', 'Genre', 'Type', 'Runtime', 'imdbID']

	// Defining array for movie-info to implement in table accordingly
	const rowsInfos = iterations.map((iteration) =>
		columns.map((column) => JSON.parse(localStorage[iteration])[column])
	)

	// Check if rowsInfos exists
	if (!iterations[0]) {
		return (
			<Container component={Box} mb={2}>
				<Paper component={Box} mt={2} elevation={10} className={classes.loadingPaper}>
					<Typography variant="subtitle1">
						Hmm.. Looks like there is no item in your favorite.
					</Typography>
					<br />
					<Divider />
					<br />
					<Typography variant="overline">
						Use Home Page Button above and start to searh some movie now!
					</Typography>
				</Paper>
			</Container>
		)
	}

	return (
		<Box mx={2} my={1}>
			<TableContainer component={Paper}>
				<Table className={classes.table}>
					<TableHead className={classes.tableHead}>
						<TableRow>
							{columns.map((column) => (
								<TableCell className={classes.tableHeadCell} key={column}>
									{column}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rowsInfos.map((rowInfos) => (
							// Using rowInfos[6] corresponds to imdbID for "key" prop
							<RowInfos key={rowInfos[6]} rowInfos={rowInfos}></RowInfos>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default FavoritesPage
