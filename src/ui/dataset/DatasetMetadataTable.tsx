import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

interface DatasetMetadataTableProps {
	file: File;
}

function DatasetMetadataTable({file}: DatasetMetadataTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Attribute</TableCell>
						<TableCell>Value</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>name</TableCell>
						<TableCell>{file.name}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>type</TableCell>
						<TableCell>{file.type}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>size</TableCell>
						<TableCell>{file.size} bytes</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>lastModified</TableCell>
						<TableCell>{new Date(file.lastModified).toISOString()}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default DatasetMetadataTable;
