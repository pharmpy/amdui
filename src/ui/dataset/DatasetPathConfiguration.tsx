import React from 'react';

import TextField from '@mui/material/TextField';

import useDataInfo from './useDataInfo';

type DatasetPathConfigurationProps = {
	csvPath: string;
};

function DatasetPathConfiguration({csvPath}: DatasetPathConfigurationProps) {
	const [state, dispatch] = useDataInfo();
	return (
		<TextField
			label="Path"
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
