import React, {ChangeEventHandler, useEffect, useState} from 'react';

import Button from '@mui/material/Button';
import DataArrayIcon from '@mui/icons-material/DataArray';
import SaveIcon from '@mui/icons-material/Save';

import Grid from '@mui/material/Grid';
import InputFileButton from '../lib/input/InputFileButton';
import getCSV from '../../lib/csv/getCSV';
import CSV from '../../lib/csv/CSV';
import saveTextAs from '../lib/output/saveTextAs';
import FileMetadataTable from './FileMetadataTable';
import DatasetMetadataTable from './DatasetMetadataTable';
import DatasetColumnConfiguration from './DatasetColumnConfiguration';
import DatasetErrorsTable from './DatasetErrorsTable';
import DatasetDataTable from './DatasetDataTable';
import Row from './Row';

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

function ConfigureDataset() {
	const [dataset, setDataset] = useState<File | undefined>(undefined);

	const {data: csv} = useCSV(dataset);

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setDataset(event.target.files?.[0]);
	};

	const text = `Choose dataset${
		dataset === undefined ? '' : ` (current: ${dataset.name})`
	}`;
	const save = () => {
		if (!dataset) return;
		const text = JSON.stringify(
			{
				a: 1,
				b: 1,
				c: 1,
			},
			undefined,
			2,
		);
		saveTextAs(text, dataset.name.replace(/\.[^.]+/, '.datainfo'));
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<InputFileButton accept="text/csv" onChange={onChange}>
					<Button
						variant="contained"
						component="span"
						startIcon={<DataArrayIcon />}
					>
						{text}
					</Button>
				</InputFileButton>
			</Grid>
			<Grid item xs={6}>
				<Button
					variant="contained"
					startIcon={<SaveIcon />}
					disabled={!dataset}
					onClick={save}
				>
					Save
				</Button>
			</Grid>
			{csv === undefined ? null : (
				<Grid item xs={12}>
					<DatasetColumnConfiguration columns={csv.meta.fields ?? []} />
				</Grid>
			)}
			{csv === undefined ? null : (
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
	);
}

export default ConfigureDataset;
