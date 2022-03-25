import React from 'react';

import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import useId from '@mui/material/utils/useId';
import Grid from '@mui/material/Grid';
import {Column} from '../lib/datainfo/schema';
import useModel from './useModel';
import ModelProvider from './ModelProvider';

function ModelType() {
	const [state, dispatch] = useModel();
	const labelId = useId();
	return (
		<FormControl>
			<FormLabel id={labelId}>Type</FormLabel>
			<RadioGroup
				aria-labelledby={labelId}
				value={state.type}
				onChange={(event) => {
					dispatch({type: 'update', key: 'type', value: event.target.value});
				}}
			>
				<FormControlLabel value="pk_iv" control={<Radio />} label="iv" />
				<FormControlLabel value="pk_oral" control={<Radio />} label="oral" />
			</RadioGroup>
		</FormControl>
	);
}

const columns: Column[] = [];

export default function ModelConfiguration() {
	return (
		<Paper sx={{height: 400}}>
			<ModelProvider columns={columns}>
				<Grid container spacing={2} padding={2}>
					<Grid item xs={4}>
						<ModelType />
					</Grid>
				</Grid>
			</ModelProvider>
		</Paper>
	);
}
