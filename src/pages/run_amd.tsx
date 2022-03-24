import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function IndexPage() {
	return (
		<Grid container spacing={2} padding={2}>
			<Grid item xs={12} sx={{paddingBottom: 10}}>
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
			</Grid>
		</Grid>
	);
}

export default IndexPage;
