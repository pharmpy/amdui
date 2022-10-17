import type {PropsOf} from '@emotion/react/types/helper';
import type {TextFieldProps} from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import React, {forwardRef} from 'react';

import {NumericFormat} from 'react-number-format';

type CustomProps = {
	onChange: (event: {target: {value: string}}) => void;
} & Omit<
	PropsOf<typeof NumericFormat>,
	'getInputRef' | 'isNumericString' | 'onValueChange'
>;

const NumberFormatCustom = forwardRef<typeof NumericFormat, CustomProps>(
	({onChange, ...rest}, ref) => {
		return (
			<NumericFormat
				{...rest}
				valueIsNumericString
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
