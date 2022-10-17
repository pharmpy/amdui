import type {ChangeEventHandler} from 'react';
import React from 'react';

import {Set as iSet} from 'immutable';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import useId from '@mui/material/utils/useId';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FileInput from '../lib/input/FileInput';
import FloatInput from '../lib/input/FloatInput';
import useModel from './useModel';

type DataInfoProps = {
	onChange: ChangeEventHandler<HTMLInputElement>;
};

function DataInfo({onChange}: DataInfoProps) {
	return (
		<FileInput
			fullWidth
			accept="text/datainfo"
			label="Data Info"
			placeholder="Choose a .datainfo file"
			onChange={onChange}
		/>
	);
}

function ModelType() {
	const [state, dispatch] = useModel();
	const labelId = useId();
	return (
		<FormControl>
			<FormLabel id={labelId}>Type</FormLabel>
			<RadioGroup
				aria-labelledby={labelId}
				value={state.type}
				onChange={(event) => {
					dispatch({
						type: 'update',
						key: 'type',
						value: event.target.value as 'pk_iv' | 'pk_oral',
					});
				}}
			>
				<FormControlLabel value="pk_iv" control={<Radio />} label="IV" />
				<FormControlLabel value="pk_oral" control={<Radio />} label="Oral" />
			</RadioGroup>
		</FormControl>
	);
}

function Init() {
	const [state, dispatch] = useModel();
	return (
		<FormControl fullWidth>
			<FormLabel>Init</FormLabel>
			<FloatInput
				fullWidth
				margin="dense"
				label="POP_CL"
				placeholder="0.01"
				value={state.popCl}
				onChange={(value) => {
					dispatch({type: 'update', key: 'popCl', value});
				}}
			/>
			<FloatInput
				fullWidth
				margin="dense"
				label="POP_VC"
				placeholder="1"
				value={state.popVc}
				onChange={(value) => {
					dispatch({type: 'update', key: 'popVc', value});
				}}
			/>
			{state.type === 'pk_oral' && (
				<FloatInput
					fullWidth
					margin="dense"
					label="POP_MAT"
					placeholder="0.1"
					disabled={state.type !== 'pk_oral'}
					value={state.type === 'pk_oral' ? state.popMat : Number.NaN}
					onChange={(value) => {
						dispatch({type: 'update', key: 'popMat', value});
					}}
				/>
			)}
		</FormControl>
	);
}

function Limits() {
	const [state, dispatch] = useModel();
	return (
		<FormControl fullWidth>
			<FormLabel>Limits</FormLabel>
			<FloatInput
				fullWidth
				margin="dense"
				label="Lower limit of quantification (LLOQ)"
				value={state.lloq}
				onChange={(value) => {
					dispatch({type: 'update', key: 'lloq', value});
				}}
			/>
		</FormControl>
	);
}

function Covariates() {
	return (
		<FormControl fullWidth>
			<FormLabel>Covariates</FormLabel>
			<CategoricalColumns />
			<ContinuousColumns />
		</FormControl>
	);
}

const increasing = (a: number, b: number): number => a - b;

function CategoricalColumns() {
	const [state, dispatch] = useModel();
	return (
		<Autocomplete
			multiple
			filterSelectedOptions
			options={state.categoricalAll}
			getOptionLabel={(index: number) => state.columns[index].name}
			value={state.categorical.toArray().sort(increasing)}
			renderInput={(parameters) => (
				<TextField
					{...parameters}
					margin="dense"
					label="Categorical"
					placeholder="Categorical covariates"
				/>
			)}
			onChange={(_event, newValue) => {
				dispatch({
					type: 'update',
					key: 'categorical',
					value: iSet(newValue.sort(increasing)),
				});
			}}
		/>
	);
}

function ContinuousColumns() {
	const [state, dispatch] = useModel();
	return (
		<Autocomplete
			multiple
			filterSelectedOptions
			options={state.continuousAll}
			getOptionLabel={(index: number) => state.columns[index].name}
			value={state.continuous.toArray().sort(increasing)}
			renderInput={(parameters) => (
				<TextField
					{...parameters}
					margin="dense"
					label="Continuous"
					placeholder="Continuous covariates"
				/>
			)}
			onChange={(_event, newValue) => {
				dispatch({
					type: 'update',
					key: 'continuous',
					value: iSet(newValue.sort(increasing)),
				});
			}}
		/>
	);
}

type ModelConfigurationProps = {
	onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function ModelConfiguration({
	onChange,
}: ModelConfigurationProps) {
	return (
		<Grid container spacing={2} padding={2}>
			<Grid item xs={12}>
				<DataInfo onChange={onChange} />
			</Grid>
			<Grid item xs={12} md={2}>
				<ModelType />
			</Grid>
			<Grid item xs={12} sm={6} md={5}>
				<Init />
			</Grid>
			<Grid item xs={12} sm={6} md={5}>
				<Limits />
			</Grid>
			<Grid item xs={12}>
				<Covariates />
			</Grid>
		</Grid>
	);
}
