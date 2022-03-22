import React, {ChangeEventHandler, useState} from "react";

import {styled} from "@mui/material/styles";

import Button from "@mui/material/Button";
import useId from "@mui/material/utils/useId";

const Input = styled('input')({
  display: 'none',
});

interface InputFileButtonProps {
	onChange: ChangeEventHandler<HTMLInputElement>;
	children: React.ReactNode;
}

const InputFileButton = ({onChange, children}: InputFileButtonProps) => {
	const inputId = useId();
	return (
		<>
		  <label htmlFor={inputId}>
			  <Input
				accept="text/csv"
				id={inputId}
				type="file"
				onChange={onChange}
			  />
			  {children}
		  </label>
		</>
)
};

export default InputFileButton;
