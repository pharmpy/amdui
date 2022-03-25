import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {PropsOf} from '@emotion/react/types/helper';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ModeProvider from '../ui/theme/ModeProvider';

import useTheme from '../ui/useTheme';
import Header from '../ui/Header';
import Main from '../ui/Main';

interface LayoutProps extends PropsOf<typeof Main> {
	path: string;
}

function Layout({path, ...rest}: LayoutProps) {
	const theme = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header path={path} />
			<Main {...rest} />
		</ThemeProvider>
	);
}

function App(props: LayoutProps) {
	return (
		<ModeProvider>
			<Layout {...props} />
		</ModeProvider>
	);
}

export default App;
