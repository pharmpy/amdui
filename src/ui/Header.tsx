import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import Breadcrumbs from './navigation/BreadCrumbs';

interface HeaderProps {
	location: Location;
}

function Header({location}: HeaderProps) {
	return (
		<AppBar position="static">
			<Toolbar>
				<Breadcrumbs location={location} />
			</Toolbar>
		</AppBar>
	);
}

export default Header;
