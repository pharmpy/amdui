import React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import useDataInfo from './useDataInfo';

type DatasetSeparatorConfigurationProps = {
	disabled: boolean; // eslint-disable-line react/boolean-prop-naming
	csvDelimiter: string;
};

const supportedDelimiter: readonly string[] = ['\\s+', ',', '\t'];

const defaultComment: Record<string, string> = {
	'\\s+': 'any amount of space', // eslint-disable-line @typescript-eslint/naming-convention
	',': 'commas', // eslint-disable-line @typescript-eslint/naming-convention
	'\t': 'tabs', // eslint-disable-line @typescript-eslint/naming-convention
};

const repr = (inputDelimiter: string, separator: string) => {
	const explanation = defaultComment[separator];
	const sameAsInput = separator === inputDelimiter;
	const comment =
		explanation === undefined
			? sameAsInput
				? 'same as input'
				: undefined
			: sameAsInput
			? `${explanation}, same as input`
			: explanation;
	const representation = JSON.stringify(separator);
	return comment === undefined
		? representation
		: representation + ` (${comment})`;
};

function DatasetSeparatorConfiguration({
	disabled,
	csvDelimiter,
}: DatasetSeparatorConfigurationProps) {
	const [state, dispatch] = useDataInfo();
	const delimiters = supportedDelimiter.includes(csvDelimiter)
		? supportedDelimiter
		: [csvDelimiter, ...supportedDelimiter];
	return (
		<FormControl>
			<InputLabel id="demo-simple-select-helper-label">Separator</InputLabel>
			<Select
				labelId="demo-simple-select-helper-label"
				id="demo-simple-select-helper"
				disabled={disabled}
				value={state.separator}
				label="Original dataset separator"
				onChange={(event) => {
					dispatch('separator')(event.target.value);
				}}
			>
				{delimiters.map((delimiter) => {
					return (
						<MenuItem key={delimiter} value={delimiter}>
							{repr(csvDelimiter, delimiter)}
						</MenuItem>
					);
				})}
			</Select>
			<FormHelperText>Separator in dataset fed to run_amd</FormHelperText>
		</FormControl>
	);
}

export default DatasetSeparatorConfiguration;
