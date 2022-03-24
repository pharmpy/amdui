import React from 'react';

import Grid from '@mui/material/Grid';

import Link from '../ui/navigation/Link';

function IndexPage() {
	return (
		<Grid container spacing={2} padding={2}>
			<Grid item>
				<Link to="/datainfo">datainfo</Link>
			</Grid>
			<Grid item>
				<Link to="/run_amd">run_amd</Link>
			</Grid>
		</Grid>
	);
}

export default IndexPage;
