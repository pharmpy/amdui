import React from 'react';

import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'gatsby';

interface TileProps {
	to: string;
}

function Tile({to}: TileProps) {
	return (
		<Grid item sm={12} md={6} lg={4} xl={3}>
			<Button
				variant="contained"
				component={Link}
				to={to}
				sx={{display: 'block'}}
			>
				<Box
					sx={{
						minHeight: 200,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant="h3">{to}</Typography>
				</Box>
			</Button>
		</Grid>
	);
}

interface TilesProps {
	children: React.ReactNode;
}

function Tiles({children}: TilesProps) {
	return (
		<Grid container spacing={4} padding={4} justifyContent="center">
			{children}
		</Grid>
	);
}

function IndexPage() {
	return (
		<Tiles>
			<Tile to="/datainfo" />
			<Tile to="/run_amd" />
		</Tiles>
	);
}

export default IndexPage;
