import React, {memo} from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import type {Nature} from '../lib/datainfo/schema';
import {
	type Column,
	descriptors,
	dtypes,
	nature,
	scales,
	types,
	units,
} from '../lib/datainfo/schema';

import type {Dispatch, State} from './Context';
import useDataInfo from './useDataInfo';

type DatasetColumnConfigurationProps = {
	columns: string[];
};

type DatasetColumnConfigurationTableProps = {
	columns: string[];
	state: State['columns'];
	dispatch: Dispatch;
};

type SelectOneInputProps<Option> = {
	options: readonly Option[];
	label: string;
	value: Option;
	onChange: (value: Option) => void;
};

function SelectOneInput<Option extends string | number>({
	label,
	options,
	value,
	onChange,
}: SelectOneInputProps<Option>) {
	const labelId = useId();
	const selectId = useId();
	return (
		<FormControl>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				label={label}
				labelId={labelId}
				id={selectId}
				value={value}
				onChange={(event) => {
					onChange(event.target.value as Option);
				}}
			>
				{options.map((option) => (
					<MenuItem key={option} value={option}>
						{String(option)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

function DatasetColumnConfiguration({
	columns,
}: DatasetColumnConfigurationProps) {
	const [state, dispatch] = useDataInfo();
	return (
		<DatasetColumnConfigurationTable
			columns={columns}
			state={state.columns}
			dispatch={dispatch}
		/>
	);
}

const DatasetColumnConfigurationTable = memo(
	({columns, state, dispatch}: DatasetColumnConfigurationTableProps) => (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Column</TableCell>
						<TableCell>Selection</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Unit</TableCell>
						<TableCell>Scale</TableCell>
						<TableCell>Nature</TableCell>
						<TableCell>Data Type</TableCell>
						<TableCell>Descriptor</TableCell>
						<TableCell>Categories</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{columns
						.map((_column, i) => i)
						.sort((i, j) => {
							const a = columns[i];
							const partitionA = state.get(a)?.drop ? 1 : 0;
							const b = columns[j];
							const partitionB = state.get(b)?.drop ? 1 : 0;
							const diff = partitionA - partitionB;
							return diff === 0 ? i - j : diff;
						})
						.map((i) => {
							const column = columns[i];
							const config = state.get(column);
							if (config === undefined) return null;
							return (
								<DatasetColumnConfigurationTableRow
									key={column}
									column={column}
									dispatch={dispatch}
									config={config}
								/>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	),
);

type DatasetColumnConfigurationTableRowProps = {
	column: string;
	dispatch: Dispatch;
	config: Column;
};

const DatasetColumnConfigurationTableRow = memo(
	({column, dispatch, config}: DatasetColumnConfigurationTableRowProps) => (
		<TableRow>
			<TableCell>{column}</TableCell>
			<TableCell>
				<Checkbox
					checked={!config.drop}
					onClick={() => {
						dispatch('column', column, 'drop')(!config.drop);
					}}
				/>
			</TableCell>
			<TableCell>
				<SelectOneInput
					label="Type"
					options={types}
					value={config.type}
					onChange={dispatch('column', column, 'type')}
				/>
			</TableCell>
			<TableCell>
				<SelectOneInput
					label="Unit"
					options={units}
					value={config.unit}
					onChange={dispatch('column', column, 'unit')}
				/>
			</TableCell>
			<TableCell>
				<SelectOneInput
					label="Scale"
					options={scales}
					value={config.scale}
					onChange={dispatch('column', column, 'scale')}
				/>
			</TableCell>
			<TableCell>
				<SelectOneInput
					label="Nature"
					options={nature}
					value={
						// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
						config.continuous === false ? 'discrete' : 'continuous'
					}
					onChange={(value: Nature) => {
						dispatch('column', column, 'continuous')(value === 'continuous');
					}}
				/>
			</TableCell>
			<TableCell>
				<SelectOneInput
					label="Data Type"
					options={dtypes}
					value={config.datatype}
					onChange={dispatch('column', column, 'datatype')}
				/>
			</TableCell>
			<TableCell>
				<SelectOneInput
					label="Descriptor"
					options={descriptors}
					value={config.descriptor ?? 'unknown'}
					onChange={dispatch('column', column, 'descriptor')}
				/>
			</TableCell>
			<TableCell>
				<TextField
					label="Categories"
					value={config.categories?.length.toString() ?? ''}
					onChange={({target: {value}}) => {
						if (value === '') {
							dispatch('column', column, 'categories')(undefined);
							return;
						}

						if (!/^[1-9]\d*$/.test(value)) return;
						const parsed = Number.parseInt(value, 10);
						if (Number.isNaN(parsed)) return;
						const ncategories = Math.min(parsed, 200);
						// eslint-disable-next-line unicorn/no-new-array
						const categories = new Array(ncategories)
							.fill(0)
							.map((_, index) => index);
						dispatch('column', column, 'categories')(categories);
					}}
				/>
			</TableCell>
		</TableRow>
	),
);

export default DatasetColumnConfiguration;
