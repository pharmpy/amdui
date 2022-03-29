import React from 'react';

import {ParseError} from 'papaparse';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface DatasetErrorsTableProps {
	errors: ParseError[];
}

function DatasetErrorsTable({errors}: DatasetErrorsTableProps) {
	return (
		<>
			{errors.map((error, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<Alert key={index} severity="error">
					<AlertTitle>
						Error{errors.length >= 2 ? ` #${index + 1}` : null}
					</AlertTitle>
					An error was raised while parsing the dataset:
					<pre>{JSON.stringify(error, undefined, 2)}</pre>
				</Alert>
			))}
		</>
	);
}

export default DatasetErrorsTable;
