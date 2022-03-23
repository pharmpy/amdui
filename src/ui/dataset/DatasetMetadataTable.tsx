import React from 'react';

import {ParseMeta} from 'papaparse';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface DatasetMetadataTableProps {
	meta: ParseMeta;
}

function DatasetMetadataTable({meta}: DatasetMetadataTableProps) {
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
						<TableCell>aborted</TableCell>
						<TableCell>{JSON.stringify(meta.aborted)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>delimiter</TableCell>
						<TableCell>{JSON.stringify(meta.delimiter)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>linebreak</TableCell>
						<TableCell>{JSON.stringify(meta.linebreak)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>truncated</TableCell>
						<TableCell>{JSON.stringify(meta.truncated)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>read</TableCell>
						<TableCell>{meta.cursor} bytes</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>fields</TableCell>
						<TableCell>
							{meta.fields?.map((field) => JSON.stringify(field)).join(' ')}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default DatasetMetadataTable;
