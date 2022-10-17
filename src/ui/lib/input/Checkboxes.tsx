import type {ChangeEvent} from 'react';
import React from 'react';

import type {Set as iSet} from 'immutable';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import useMapping from '../memo/useMapping';

type CheckboxesProps<T> = {
	title?: string;
	options: readonly T[];
	disabled?: iSet<T>;
	checked: iSet<T>;
	onChange: (checked: iSet<T>) => void;
	helperText?: string;
};

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

function Checkboxes<T extends string | number>({
	title,
	options,
	disabled,
	checked,
	onChange,
	helperText,
}: CheckboxesProps<T>) {
	const onOptionChange = useMapping(
		(option: T) => (event: InputChangeEvent) => {
			if (event.target.checked) {
				onChange(checked.add(option));
			} else {
				onChange(checked.remove(option));
			}
		},
		[onChange, checked],
	);

	return (
		<FormControl component="fieldset" variant="standard">
			{title && <FormLabel component="legend">{title}</FormLabel>}
			<FormGroup>
				{options.map((option) => (
					<FormControlLabel
						key={option}
						label={option}
						control={
							<Checkbox
								name={String(option)}
								disabled={disabled?.has(option)}
								checked={checked.has(option)}
								onChange={onOptionChange(option)}
							/>
						}
					/>
				))}
			</FormGroup>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
}

export default Checkboxes;
