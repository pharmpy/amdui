import React, {useCallback} from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Checkboxes from '../lib/input/Checkboxes';
import useModel from '../model/useModel';
import useSearch from './useSearch';

function AbsorptionRate() {
	const [state, dispatch] = useSearch();
	const onChange = useCallback(
		(value: typeof state.absorptionRate) => {
			dispatch({type: 'update', key: 'absorptionRate', value});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);
	return (
		<Checkboxes
			title="Absorption rate"
			options={state.absorptionRateAll}
			disabled={state.absorptionRateDisabled}
			checked={state.absorptionRate}
			onChange={onChange}
		/>
	);
}

function AbsorptionDelay() {
	const [state, dispatch] = useSearch();
	const onChange = useCallback(
		(value: typeof state.absorptionDelay) => {
			dispatch({type: 'update', key: 'absorptionDelay', value});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);
	return (
		<Checkboxes
			title="Absorption delay"
			options={state.absorptionDelayAll}
			checked={state.absorptionDelay}
			onChange={onChange}
		/>
	);
}

function AbsorptionDelayTransits() {
	const [state, dispatch] = useSearch();
	const onChange = useCallback(
		(value: typeof state.absorptionDelayTransits) => {
			dispatch({type: 'update', key: 'absorptionDelayTransits', value});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);
	return (
		<Checkboxes
			title="Absorption delay transits"
			options={state.absorptionDelayTransitsAll}
			checked={state.absorptionDelayTransits}
			onChange={onChange}
		/>
	);
}

function Distribution() {
	const [state, dispatch] = useSearch();
	const onChange = useCallback(
		(value: typeof state.distributionCompartments) => {
			dispatch({type: 'update', key: 'distributionCompartments', value});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);
	return (
		<Checkboxes
			title="Distribution compartments"
			options={state.distributionCompartmentsAll}
			disabled={state.distributionCompartmentsDisabled}
			checked={state.distributionCompartments}
			onChange={onChange}
		/>
	);
}

function Elimination() {
	const [state, dispatch] = useSearch();
	const onChange = useCallback(
		(value: typeof state.elimination) => {
			dispatch({type: 'update', key: 'elimination', value});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);
	return (
		<Checkboxes
			title="Elimination"
			options={state.eliminationAll}
			disabled={state.eliminationDisabled}
			checked={state.elimination}
			onChange={onChange}
		/>
	);
}

export default function SearchConfiguration() {
	const [state] = useModel();
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Paper sx={{display: 'flex'}}>
					<Grid container spacing={2} padding={2}>
						<Grid item xs={12} sm={6} md={4}>
							<Distribution />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Elimination />
						</Grid>
					</Grid>
				</Paper>
			</Grid>

			{state.type === 'pk_oral' && (
				<Grid item xs={12}>
					<Paper sx={{display: 'flex'}}>
						<Grid container spacing={2} padding={2}>
							<Grid item xs={12} sm={6} md={4}>
								<AbsorptionRate />
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<AbsorptionDelay />
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<AbsorptionDelayTransits />
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			)}
		</Grid>
	);
}
