import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTwitter, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import { year } from '../../../utils/getFullYear'
import { Box, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.primary.main,
		color: 'white',
		width: '100%',
		marginTop: theme.spacing(2)
	}
}))

const Footer = () => {
	const classes = useStyle()
	return (
		<Box className={classes.footer} component="footer" id="footer" textAlign="center">
			<Container component={Box} p={2}>
				<Typography variant="caption">
					Made with{' '}
					<span role="img" aria-label="love">
						❤
					</span>{' '}
					and{' '}
					<span role="img" aria-label="coffee">
						☕
					</span>{' '}
					in Izmir, {year}
				</Typography>
			</Container>
			<Container>
				<Typography variant="overline">© Copyright, RCA | Movie-list App</Typography>
			</Container>
		</Box>
	)
}

export default Footer
