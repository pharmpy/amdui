import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// eslint-disable-next-line @typescript-eslint/naming-convention
function RunAMDPage() {
	return (
		<Grid container spacing={2} padding={2}>
			<Grid item xs={6}>
				<Paper sx={{height: 400}} />
			</Grid>
			<Grid item xs={6}>
				<Paper sx={{height: 400}} />
			</Grid>
			<Grid item xs={12}>
				<Paper sx={{height: 400}} />
			</Grid>
		</Grid>
	);
}

export default RunAMDPage;
