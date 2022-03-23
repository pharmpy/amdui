import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

function Header() {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" color="inherit" component="div">
					AMD UI
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
