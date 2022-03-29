import React, {ChangeEventHandler, useRef, useState} from 'react';

import {styled} from '@mui/material/styles';

import useId from '@mui/material/utils/useId';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import {PropsOf} from '@emotion/react/types/helper';

const Input = styled('input')({
	display: 'none',
});

interface FileInputProps extends PropsOf<typeof OutlinedInput> {
	accept?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	label?: string;
	fullWidth?: boolean;
}

function FileInput({
	accept,
	onChange,
	label,
	fullWidth,
	...rest
}: FileInputProps) {
	const [filename, setFilename] = useState<string>('');
	const inputId = useId();
	const outlinedInputId = useId();
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<FormControl variant="outlined" fullWidth={fullWidth}>
			<label htmlFor={inputId}>
				<Input
					ref={inputRef}
					id={inputId}
					type="file"
					accept={accept}
					onChange={(event) => {
						const file = event.target.files?.[0];
						setFilename(file === undefined ? '' : file.name);
						onChange(event);
					}}
				/>
				{label && <InputLabel htmlFor={outlinedInputId}>{label}</InputLabel>}
				<OutlinedInput
					id={outlinedInputId}
					fullWidth={fullWidth}
					value={filename}
					label={label}
					endAdornment={
						<InputAdornment position="end">
							<Button variant="contained">Browse</Button>
						</InputAdornment>
					}
					onClick={() => {
						inputRef.current?.click();
					}}
					{...rest}
				/>
			</label>
		</FormControl>
	);
}

export default FileInput;
