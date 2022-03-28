import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ModelConfiguration from '../ui/model/ModelConfiguration';
import Snippet from '../ui/amd/Snippet';
import SearchConfiguration from '../ui/search/SearchConfiguration';

// eslint-disable-next-line @typescript-eslint/naming-convention
function RunAMDPage() {
	return (
		<Grid container spacing={2} padding={2}>
			<Grid item xs={6}>
				<Paper sx={{display: 'flex'}}>
					<ModelConfiguration />
				</Paper>
			</Grid>
			<Grid item xs={6}>
				<Paper sx={{display: 'flex'}}>
					<SearchConfiguration />
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper sx={{display: 'flex'}}>
					<Snippet />
				</Paper>
			</Grid>
		</Grid>
	);
}

export default RunAMDPage;
