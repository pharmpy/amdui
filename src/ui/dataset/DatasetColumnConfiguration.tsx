import React, {useState} from 'react';
import useId from '@mui/material/utils/useId';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface DatasetColumnConfigurationProps {
	columns: string[];
}

const kinds = [
	'id',
	'idv',
	'dose',
	'dv',
	'occasion',
	'covariate - categorical',
	'covariate - continuous',
];

const bestGuess = (column: string): string => {
	const slug = column.toLowerCase();
	if (slug === 'id') return 'id';
	if (slug === 'time') return 'idv';
	if (slug === 'amt') return 'dose';
	if (slug.startsWith('dv')) return 'dv';
	if (slug === 'visit') return 'occasion';
	if (slug === 'apgr') return 'covariate - categorical';
	if (slug === 'sex') return 'covariate - categorical';
	if (slug === 'wgt') return 'covariate - continuous';
	if (slug === 'bmi') return 'covariate - continuous';
	return 'covariate - continuous';
};

interface ColumnKindSelectorProps {
	column: string;
}

function ColumnKindSelector({column}: ColumnKindSelectorProps) {
	const labelId = useId();
	const selectId = useId();
	const [kind, setKind] = useState<string>(bestGuess(column));
	return (
		<FormControl>
			<InputLabel id={labelId}>Kind</InputLabel>
			<Select
				label="Kind"
				labelId={labelId}
				id={selectId}
				value={kind}
				onChange={(event) => {
					setKind(event.target.value);
				}}
			>
				{kinds.map((kind) => (
					<MenuItem key={kind} value={kind}>
						{kind}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

function DatasetColumnConfiguration({
	columns,
}: DatasetColumnConfigurationProps) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Column</TableCell>
						<TableCell>Type</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{columns.map((column) => {
						return (
							<TableRow key={column}>
								<TableCell>{column}</TableCell>
								<TableCell>
									<ColumnKindSelector column={column} />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default DatasetColumnConfiguration;
