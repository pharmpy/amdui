import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type {PropsOf} from '@emotion/react/types/helper';

import {
	ThemeProvider,
	Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';
// eslint-disable-next-line import/no-unassigned-import
import type {} from '@mui/material/themeCssVarsAugmentation';
import CssBaseline from '@mui/material/CssBaseline';

import useTheme from '../ui/useTheme';
import Header from '../ui/Header';
import Main from '../ui/Main';

type LayoutProps = {
	path: string;
} & PropsOf<typeof Main>;

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
		<CssVarsProvider defaultMode="system">
			<Layout {...props} />
		</CssVarsProvider>
	);
}

export default App;
