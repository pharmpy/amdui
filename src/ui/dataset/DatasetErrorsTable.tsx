import React from 'react';

import {ParseError} from 'papaparse';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface DatasetErrorsTableProps {
	errors: ParseError[];
}

function DatasetErrorsTable({errors}: DatasetErrorsTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Index</TableCell>
						<TableCell>Error</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{errors.map((error, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<TableRow key={index}>
							<TableCell>{index}</TableCell>
							<TableCell>{JSON.stringify(error)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default DatasetErrorsTable;
