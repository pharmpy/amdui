import type {ChangeEventHandler} from 'react';
import React from 'react';

import {styled} from '@mui/material/styles';

import useId from '@mui/material/utils/useId';

const Input = styled('input')({
	display: 'none',
});

type InputFileButtonProps = {
	accept?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	children: React.ReactNode;
};

function InputFileButton({accept, onChange, children}: InputFileButtonProps) {
	const inputId = useId();
	return (
		<label htmlFor={inputId}>
			<Input accept={accept} id={inputId} type="file" onChange={onChange} />
			{children}
		</label>
	);
}

export default InputFileButton;
