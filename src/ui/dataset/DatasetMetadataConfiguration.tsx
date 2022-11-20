import React, {useState} from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

import type CSV from '../../lib/csv/CSV';

import type Row from './Row';
import DatasetPathConfiguration from './DatasetPathConfiguration';
import DatasetSeparatorConfiguration from './DatasetSeparatorConfiguration';

type DatasetMetadataConfigurationProps = {
	dataset: File;
	csv: CSV<Row>;
};

function DatasetMetadataConfiguration({
	dataset,
	csv,
}: DatasetMetadataConfigurationProps) {
	const [configurable, setConfigurable] = useState<boolean>(false);
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant="h3">
					Dataset metadata{' '}
					<Button
						disabled={configurable}
						startIcon={<EditIcon />}
						onClick={() => {
							setConfigurable(true);
						}}
					>
						{configurable ? 'Editing' : 'Edit'}
					</Button>
				</Typography>
				<Typography variant="subtitle2">
					*please edit if different than input CSV
				</Typography>
			</Grid>
			<Grid item>
				<Paper>
					<Grid container spacing={2} padding={2}>
						<Grid item>
							<DatasetPathConfiguration
								disabled={!configurable}
								csvPath={dataset.name}
							/>
						</Grid>
						<Grid item>
							<DatasetSeparatorConfiguration
								disabled={!configurable}
								csvDelimiter={csv.meta.delimiter}
							/>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default DatasetMetadataConfiguration;
