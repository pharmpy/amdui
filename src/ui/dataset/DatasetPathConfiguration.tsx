import React from 'react';

import TextField from '@mui/material/TextField';

import useDataInfo from './useDataInfo';

type DatasetPathConfigurationProps = {
	disabled: boolean; // eslint-disable-line react/boolean-prop-naming
	csvPath: string;
};

function DatasetPathConfiguration({
	disabled,
	csvPath,
}: DatasetPathConfigurationProps) {
	const [state, dispatch] = useDataInfo();
	return (
		<TextField
			label="Path"
			disabled={disabled}
			placeholder={csvPath}
			helperText="Relative to .datainfo directory"
			value={state.path}
			onChange={(event) => {
				dispatch('path')(event.target.value);
			}}
		/>
	);
}

export default DatasetPathConfiguration;
