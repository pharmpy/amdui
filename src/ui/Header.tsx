import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import Breadcrumbs from './navigation/BreadCrumbs';

interface HeaderProps {
	path: string;
}

function Header({path}: HeaderProps) {
	return (
		<AppBar position="static">
			<Toolbar>
				<Breadcrumbs path={path} />
			</Toolbar>
		</AppBar>
	);
}

export default Header;
