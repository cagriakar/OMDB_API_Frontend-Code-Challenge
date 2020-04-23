import React, { useState, useContext } from 'react'
import { TableCell, TableRow, Typography, Popover, Button } from '@material-ui/core'
import { GlobalContext } from '../../global/context/GlobalState'

const RowInfos = ({ rowInfos }) => {
	// Importing required states
	const { removeFavorite } = useContext(GlobalContext)

	// state for popover component
	const [anchorEl, setAnchorEl] = useState()

	// state for storing imbdID for remove from favorite request in future
	const [selectedID, setselectedID] = useState()

	// Popover closure handling
	const handleClose = () => {
		setAnchorEl(null)
		setselectedID(null)
	}

	// Readiness for remove from favorite function
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
		setselectedID(event.currentTarget.lastChild.innerText)
	}

	// Remove from favorite function
	const handleRemove = () => {
		removeFavorite(selectedID)
	}

	// Popover options
	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	return (
		<>
			<TableRow hover={true} aria-describedby={id} onClick={handleClick}>
				{rowInfos.map((rowInfo, index) => (
					<TableCell key={index}>{rowInfo}</TableCell>
				))}
			</TableRow>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'center',
					horizontal: 'center'
				}}>
				<Button variant="contained" color="secondary" onClick={handleRemove}>
					<Typography variant="overline" noWrap>
						Remove from favorite
					</Typography>
				</Button>
			</Popover>
		</>
	)
}

export default RowInfos
