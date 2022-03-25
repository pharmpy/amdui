import React from 'react';

import {useTheme} from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import Breadcrumbs from './navigation/BreadCrumbs';
import useMode from './theme/useMode';

interface HeaderProps {
	path: string;
}

function Header({path}: HeaderProps) {
	const {
		palette: {mode},
	} = useTheme();
	const [, setMode] = useMode();
	return (
		<AppBar position="static">
			<Toolbar>
				<Breadcrumbs path={path} />
				<Box sx={{flexGrow: 1}} />
				<Box sx={{display: {xs: 'none', md: 'flex'}}}>
					<IconButton
						size="large"
						aria-label={`switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
						color="inherit"
						onClick={() => {
							setMode(mode === 'dark' ? 'light' : 'dark');
						}}
					>
						{mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>

					<IconButton
						size="large"
						aria-label="edit this page on GitHub"
						color="inherit"
						component="a"
						href="https://github.com/pharmpy/amdui"
					>
						<EditIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
