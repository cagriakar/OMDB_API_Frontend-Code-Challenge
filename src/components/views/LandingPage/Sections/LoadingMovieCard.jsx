import React from 'react'
import { Grid, Card, Button, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Skeleton from '@material-ui/lab/Skeleton'

// Defining some style
const useStyle = makeStyles((theme) => ({
	cardBorderSecondary: {
		border: '2px solid',
		borderColor: theme.palette.secondary.main
	}
}))

const LoadingMovieCard = () => {
	// Injecting defined style with "classes" object by useStyles()
	const classes = useStyle()

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card className={classes.cardBorderSecondary}>
				<Button
					variant="outlined"
					color="secondary"
					size="small"
					fullWidth
					startIcon={
						<Skeleton animation="wave" variant="circle" width={18} height={18} />
					}
					style={{ borderRadius: 0 }}>
					<Skeleton
						animation="wave"
						height={30}
						width="80%"
						style={{ marginBottom: 3 }}
					/>
				</Button>
				<Skeleton animation="wave" variant="rect" style={{ height: 300 }} />
				<CardActions>
					<Grid container justify="space-between">
						<Grid item container>
							<Skeleton
								animation="wave"
								height={30}
								width="80%"
								style={{ marginBottom: 6 }}
							/>
						</Grid>
						<Grid item container>
							<Skeleton
								animation="wave"
								height={20}
								style={{ marginBottom: 6 }}
								width="100%"
							/>
						</Grid>
						<Grid item container>
							<Skeleton
								animation="wave"
								height={20}
								style={{ marginBottom: 6 }}
								width="100%"
							/>
						</Grid>
						<Grid item container justify="center">
							<Skeleton
								animation="wave"
								height={25}
								width="50%"
								style={{ marginBottom: 6 }}
							/>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		</Grid>
	)
}

export default LoadingMovieCard
