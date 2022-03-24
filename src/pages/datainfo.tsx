import React from 'react';

import Grid from '@mui/material/Grid';
import ConfigureDataset from '../ui/dataset/ConfigureDataset';

function IndexPage() {
	return (
		<Grid container spacing={2} padding={2}>
			<Grid item xs={12} sx={{paddingBottom: 10}}>
				<ConfigureDataset />
			</Grid>
		</Grid>
	);
}

export default IndexPage;
