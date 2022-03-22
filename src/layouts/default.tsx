import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import useTheme from '../ui/useTheme';
import Header from '../ui/Header';
import Main from '../ui/Main';

const Layout = (props: any) => {
	const theme = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header/>
			<Main {...props}/>
		</ThemeProvider>
	)
};

export default Layout;
