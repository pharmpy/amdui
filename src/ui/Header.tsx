import React from 'react';

import {useTheme, useColorScheme} from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SystemModeIcon from '@mui/icons-material/Brightness4';

import useIsMounted from './lib/component/useIsMounted';
import Breadcrumbs from './navigation/BreadCrumbs';
import useMode from './theme/useMode';

type HeaderProps = {
	path: string;
};

type Mode = 'system' | 'light' | 'dark';

type ModeMapOptions<T> = {
	system: T;
	light: T;
	dark: T;
};

function modeMap<T>(mode: Mode, options: ModeMapOptions<T>): T {
	return options[mode];
}

function ModeSwitch() {
	const isMounted = useIsMounted();
	const {mode, setMode} = useColorScheme();

	let onClick;
	let ariaLabel;
	let Icon = CircleIcon;
	if (mode !== undefined && isMounted()) {
		const nextMode = modeMap<Mode>(mode, {
			system: 'light',
			light: 'dark',
			dark: 'system',
		});
		onClick = () => {
			setMode(nextMode);
		};

		ariaLabel = `switch to ${nextMode} mode`;
		Icon = modeMap(mode, {
			system: SystemModeIcon,
			light: LightModeIcon,
			dark: DarkModeIcon,
		});
	}

	return (
		<IconButton
			size="large"
			disabled={!onClick}
			aria-label={ariaLabel}
			color="inherit"
			onClick={onClick}
		>
			<Icon />
		</IconButton>
	);
}

function Header({path}: HeaderProps) {
	return (
		<AppBar position="static">
			<Toolbar>
				<Breadcrumbs path={path} />
				<Box sx={{flexGrow: 1}} />
				<Box sx={{display: {xs: 'none', md: 'flex'}}}>
					<ModeSwitch />

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
