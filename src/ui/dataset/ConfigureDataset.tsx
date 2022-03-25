import React, {ChangeEventHandler, useEffect, useState} from 'react';

import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';

import DataArrayIcon from '@mui/icons-material/DataArray';
import SaveIcon from '@mui/icons-material/Save';

import Typography from '@mui/material/Typography';
import InputFileButton from '../lib/input/InputFileButton';
import getCSV from '../../lib/csv/getCSV';
import CSV from '../../lib/csv/CSV';
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
const useCSV = (file: File | undefined) => {
	const [data, setData] = useState<CSV<Row> | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | undefined>(undefined);
	useEffect(() => {
		setData(undefined);
		setError(undefined);
		if (file === undefined) {
			setLoading(false);
			return;
		}

		setLoading(true);
		let cancelled = false;
		getCSV<Row>(file).then(
			(result) => {
				if (cancelled) return;
				setData(result);
				setLoading(false);
			},
			(error: any) => {
				if (cancelled) return;
				setError(error);
				setLoading(false);
			},
		);

		return () => {
			cancelled = true;
		};
	}, [file]);

	return {
		loading,
		error,
		data,
	};
};

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
				{dataset === undefined ? null : csv === undefined ? (
					<Grid item xs={12}>
						<Typography variant="h6">loading...</Typography>
					</Grid>
				) : (
					<Grid item xs={12}>
						<DatasetColumnConfiguration columns={columns} />
					</Grid>
				)}
				{csv === undefined || csv.errors.length === 0 ? null : (
					<Grid item xs={12}>
						<DatasetErrorsTable errors={csv.errors} />
					</Grid>
				)}
				{dataset === undefined ? null : (
					<Grid item xs={12}>
						<FileMetadataTable file={dataset} />
					</Grid>
				)}
				{csv === undefined ? null : (
					<Grid item xs={12}>
						<DatasetMetadataTable meta={csv.meta} />
					</Grid>
				)}
				{csv === undefined ? null : (
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
