import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type Row from './Row';

type DatasetDataTableProps = {
	data: Row[];
};

function DatasetDataTable({data}: DatasetDataTableProps) {
	if (data.length === 0) return null;
	const columns = Object.keys(data[0]);
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="right">Row</TableCell>
						{columns.map((column, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<TableCell key={index} align="right">
								{column}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<TableRow key={index}>
							<TableCell align="right">{index}</TableCell>
							{Object.values(row).map((value, cellIndex) => (
								// eslint-disable-next-line react/no-array-index-key
								<TableCell key={cellIndex} align="right">
									{value}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default DatasetDataTable;
