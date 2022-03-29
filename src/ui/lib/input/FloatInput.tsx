import {PropsOf} from '@emotion/react/types/helper';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import React, {forwardRef} from 'react';

import NumberFormat from 'react-number-format';

interface CustomProps
	extends Omit<
		PropsOf<typeof NumberFormat>,
		'getInputRef' | 'isNumericString' | 'onValueChange'
	> {
	onChange: (event: {target: {value: string}}) => void;
}

const NumberFormatCustom = forwardRef<typeof NumberFormat, CustomProps>(
	({onChange, ...rest}, ref) => {
		return (
			<NumberFormat
				{...rest}
				isNumericString
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							value: values.value,
						},
					});
				}}
			/>
		);
	},
);

type FloatInputProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
	value: number;
	onChange: (value: number) => void;
};

function FloatInput({value, onChange, ...rest}: FloatInputProps) {
	return (
		<TextField
			{...rest}
			value={Number.isNaN(value) ? '' : String(value)}
			InputProps={{
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				inputComponent: NumberFormatCustom as any,
			}}
			onChange={(event) => {
				const parsed = Number.parseFloat(event.target.value);
				onChange(parsed);
			}}
		/>
	);
}

export default FloatInput;
