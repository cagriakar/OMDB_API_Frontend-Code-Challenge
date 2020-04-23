import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Badge,
	Button,
	Tooltip,
	Collapse
} from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/styles'

import SearchBar from './SearchBar'
import { GlobalContext } from '../../global/context/GlobalState'

// Defining some style
const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	button: {
		marginLeft: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	loginIconButton: {
		display: 'none',
		[theme.breakpoints.down('xs')]: {
			display: 'flex'
		}
	}
}))

const NavBar = () => {
	// Injecting defined style with "classes" object by useStyles()
	const classes = useStyles()

	// Importing required states
	const { favorites, isOnFavoritePage } = useContext(GlobalContext)

	// state for SearchBar toggle
	const [isSearchBarOpen, setIsSearchBarOpen] = useState(true)

	const handleClick = () => setIsSearchBarOpen(!isSearchBarOpen)

	return (
		<>
			<AppBar component="nav" color="primary" position="sticky">
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open-drawer"
						className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap className={classes.grow}>
						<Link
							to="/"
							style={{
								color: 'inherit',
								textDecoration: 'none'
							}}>
							RCA Movie-App
						</Link>
					</Typography>
					{isOnFavoritePage ? (
						<Tooltip TransitionComponent={Zoom} title="Open Search-bar" arrow>
							<IconButton aria-label="search" color="inherit" onClick={handleClick}>
								<SearchIcon />
							</IconButton>
						</Tooltip>
					) : (
						<Tooltip TransitionComponent={Zoom} title="Home" arrow>
							<Link
								to="/"
								style={{
									color: 'inherit',
									textDecoration: 'none'
								}}>
								<IconButton aria-label="home" color="inherit">
									<HomeIcon />
								</IconButton>
							</Link>
						</Tooltip>
					)}

					<Tooltip TransitionComponent={Zoom} title="Favorite List" arrow>
						<Link to="/favorite" style={{ color: 'inherit' }}>
							<IconButton aria-label="favorite-list" color="inherit">
								<Badge
									badgeContent={favorites && favorites.length}
									color="secondary">
									<FavoriteBorderIcon />
								</Badge>
							</IconButton>
						</Link>
					</Tooltip>
					<Tooltip TransitionComponent={Zoom} title="Login or Sign-up" arrow>
						<IconButton
							aria-label="user"
							color="inherit"
							className={classes.loginIconButton}>
							<ExitToAppIcon />
						</IconButton>
					</Tooltip>
					<Button variant="outlined" color="inherit" className={classes.button}>
						<Typography variant="overline" noWrap>
							Login | Sign-up
						</Typography>
					</Button>
				</Toolbar>
			</AppBar>
			{isOnFavoritePage && (
				<Collapse in={isSearchBarOpen}>
					<SearchBar />
				</Collapse>
			)}
		</>
	)
}

export default NavBar
