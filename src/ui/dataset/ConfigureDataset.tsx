import React, {ChangeEventHandler, useState} from 'react';

import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';

import DataArrayIcon from '@mui/icons-material/DataArray';
import SaveIcon from '@mui/icons-material/Save';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputFileButton from '../lib/input/InputFileButton';
import getCSV from '../../lib/csv/getCSV';
import CSV from '../../lib/csv/CSV';
import useFile from '../../lib/file/useFile';
import FileMetadataTable from './FileMetadataTable';
import DatasetMetadataTable from './DatasetMetadataTable';
import DatasetColumnConfiguration from './DatasetColumnConfiguration';
import DatasetErrorsTable from './DatasetErrorsTable';
import DatasetDataTable from './DatasetDataTable';
import Row from './Row';
import Provider from './Provider';
import useSave from './useSave';
import useDataInfo from './useDataInfo';

// eslint-disable-next-line @typescript-eslint/naming-convention
const useCSV = (file: File | undefined) => useFile<CSV<Row>>(file, getCSV);

interface ConfigureDatasetConsumerProps {
	dataset?: File;
	csv?: CSV<Row>;
	columns: string[];
}

function ConfigureDatasetConsumer({
	dataset,
	csv,
	columns,
}: ConfigureDatasetConsumerProps) {
	const [showMetadata, setShowMetadata] = useState<boolean>(false);
	const [state] = useDataInfo();
	const save = useSave(
		state,
		dataset?.name.replace(/\.[^.]+/, '.datainfo') ?? 'data.datainfo',
	);

	return (
		<>
			<Fab
				sx={{position: 'fixed', bottom: 16, right: 16}}
				disabled={state.size === 0}
				onClick={save}
			>
				<SaveIcon />
			</Fab>
			<Grid container spacing={3} padding={3}>
				{dataset === undefined ? null : (
					<Grid item xs={12}>
						<Typography variant="h3">{dataset.name}</Typography>
					</Grid>
				)}
				{csv === undefined || csv.errors.length === 0 ? null : (
					<Grid item xs={12}>
						<DatasetErrorsTable errors={csv.errors} />
					</Grid>
				)}
				{dataset === undefined ? null : csv === undefined ? (
					<Grid item xs={12}>
						<Typography variant="h6">loading...</Typography>
					</Grid>
				) : (
					<Grid item xs={12}>
						<DatasetColumnConfiguration columns={columns} />
					</Grid>
				)}
				{dataset === undefined ? null : (
					<Grid item xs={12}>
						{showMetadata ? (
							<Typography variant="h3">
								Metadata{' '}
								<Button
									onClick={() => {
										setShowMetadata(false);
									}}
								>
									hide
								</Button>
							</Typography>
						) : (
							<Button
								onClick={() => {
									setShowMetadata(true);
								}}
							>
								Show metadata
							</Button>
						)}
					</Grid>
				)}
				{dataset === undefined || !showMetadata ? null : (
					<Grid item xs={12}>
						<FileMetadataTable file={dataset} />
					</Grid>
				)}
				{csv === undefined || !showMetadata ? null : (
					<Grid item xs={12}>
						<DatasetMetadataTable meta={csv.meta} />
					</Grid>
				)}
				{csv === undefined || !showMetadata ? null : (
					<Grid item xs={12}>
						<DatasetDataTable data={csv.data} />
					</Grid>
				)}
			</Grid>
		</>
	);
}

function ConfigureDataset() {
	const [dataset, setDataset] = useState<File | undefined>(undefined);

	const {data: csv} = useCSV(dataset);

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setDataset(event.target.files?.[0]);
	};

	const text = `Choose dataset${
		dataset === undefined ? '' : ` (current: ${dataset.name})`
	}`;

	const columns = csv?.meta.fields ?? [];

	return (
		<>
			<InputFileButton accept="text/csv" onChange={onChange}>
				<Fab
					variant="extended"
					component="span"
					sx={{position: 'fixed', bottom: 19, right: 84}}
				>
					<DataArrayIcon sx={{mr: 1}} />
					{text}
				</Fab>
			</InputFileButton>
			<Provider columns={columns}>
				<ConfigureDatasetConsumer
					dataset={dataset}
					columns={columns}
					csv={csv}
				/>
			</Provider>
		</>
	);
}

export default ConfigureDataset;
