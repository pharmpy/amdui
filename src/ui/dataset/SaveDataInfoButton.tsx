import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import React from 'react';
import saveTextAs from '../lib/output/saveTextAs';
import useDataInfo from './useDataInfo';

interface Props {
	filename?: string;
}

function SaveDataInfoButton({filename}: Props) {
	const [state] = useDataInfo();

	const save = () => {
		if (state.size === 0) return;
		const text = JSON.stringify(
			{
				columns: Array.from(state.values()),
			},
			undefined,
			2,
		);
		saveTextAs(text, filename ?? 'data.datainfo');
	};

	return (
		<Button
			variant="contained"
			startIcon={<SaveIcon />}
			disabled={state.size === 0}
			onClick={save}
		>
			Save
		</Button>
	);
}

export default SaveDataInfoButton;
