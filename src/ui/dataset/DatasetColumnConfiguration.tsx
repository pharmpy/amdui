import React from 'react';
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
import {
	descriptors,
	dtypes,
	Nature,
	nature,
	scales,
	types,
	units,
} from '../lib/datainfo/schema';
import useDataInfo from './useDataInfo';

interface DatasetColumnConfigurationProps {
	columns: string[];
}

interface SelectOneInputProps<Option> {
	options: readonly Option[];
	label: string;
	value: Option;
	onChange: (value: Option) => void;
}

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
					</TableRow>
				</TableHead>
				<TableBody>
					{columns
						.slice()
						.sort((a, b) => {
							if (state.get(a)?.drop) {
								return state.get(b)?.drop
									? columns.indexOf(a) - columns.indexOf(b)
									: 1;
							}

							if (state.get(b)?.drop) {
								return -1;
							}

							return columns.indexOf(a) - columns.indexOf(b);
						})
						.map((column) => {
							const config = state.get(column);
							console.debug({state, config});
							if (config === undefined) return null;
							return (
								<TableRow key={column}>
									<TableCell>
										<Checkbox
											checked={!config.drop}
											onClick={() => {
												dispatch(column, 'drop')(!config.drop);
											}}
										/>
									</TableCell>
									<TableCell>{column}</TableCell>
									<TableCell>
										<SelectOneInput
											label="Type"
											options={types}
											value={config.type}
											onChange={dispatch(column, 'type')}
										/>
									</TableCell>
									<TableCell>
										<SelectOneInput
											label="Unit"
											options={units}
											value={config.unit}
											onChange={dispatch(column, 'unit')}
										/>
									</TableCell>
									<TableCell>
										<SelectOneInput
											label="Scale"
											options={scales}
											value={config.scale}
											onChange={dispatch(column, 'scale')}
										/>
									</TableCell>
									<TableCell>
										<SelectOneInput
											label="Nature"
											options={nature}
											value={config.continuous ? 'continuous' : 'discrete'}
											onChange={(value: Nature) => {
												dispatch(column, 'continuous')(value === 'continuous');
											}}
										/>
									</TableCell>
									<TableCell>
										<SelectOneInput
											label="Data Type"
											options={dtypes}
											value={config.datatype}
											onChange={dispatch(column, 'datatype')}
										/>
									</TableCell>
									<TableCell>
										<SelectOneInput
											label="Descriptor"
											options={descriptors}
											value={config.descriptor ?? 'unknown'}
											onChange={dispatch(column, 'descriptor')}
										/>
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
