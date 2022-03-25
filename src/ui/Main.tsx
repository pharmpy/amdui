import React from 'react';

import Grid from '@mui/material/Grid';

interface MainProps {
	children: React.ReactNode;
}

function Main({children}: MainProps) {
	return (
		<Grid container spacing={2} padding={2}>
			<Grid item xs={12} sx={{paddingBottom: 10}}>
				{children}
			</Grid>
		</Grid>
	);
}

export default Main;
