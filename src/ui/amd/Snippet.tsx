import React, {useState} from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Grid from '@mui/material/Grid';
import HighlightGrammar from '../lib/text/HighlightGrammar';
import useModel from '../model/useModel';
import useSearch from '../search/useSearch';
import type {State as SearchState} from '../search/SearchContext';
import type {State as ModelState} from '../model/ModelContext';

const languages = {
	python: 'Python',
	r: 'R',
	bash: 'bash',
} as const;

type Language = keyof typeof languages;

const defaultLanguage = 'python';

// eslint-disable-next-line react/hook-use-state
const useLanguage = () => useState<Language>(defaultLanguage);

const join = (parts: string[], separator: string): string => {
	return parts.filter((part: string) => part !== '').join(separator);
};

const searchSpace = (model: ModelState, search: SearchState) => {
	const peripherals = search.distributionCompartmentsAll
		.filter((x) => x !== 1 && search.distributionCompartments.has(x))
		.map((x) => String(x - 1));

	const peripheralsStatement =
		peripherals.length === 0 ? '' : `PERIPHERALS([${join(peripherals, ',')}])`;

	const elimination = search.eliminationAll.filter((elimination) =>
		search.elimination.has(elimination),
	);

	const eliminationStatement = `ELIMINATION([${join(elimination, ',')}])`;

	const categorical =
		model.categorical.size === model.categoricalAll.length
			? null
			: model.categorical.map((index) => model.columns[index].name).toArray();

	const letCategoricalStatement =
		categorical === null ? '' : `LET(CATEGORICAL,[${join(categorical, ',')}])`;

	const continuous =
		model.continuous.size === model.continuousAll.length
			? null
			: model.continuous.map((index) => model.columns[index].name).toArray();

	const letContinuousStatement =
		continuous === null ? '' : `LET(CONTINUOUS,[${join(continuous, ',')}])`;

	// eslint-disable-next-line default-case
	switch (model.type) {
		case 'pk_iv': {
			return join(
				[
					eliminationStatement,
					peripheralsStatement,
					letCategoricalStatement,
					letContinuousStatement,
				],
				';',
			);
		}

		case 'pk_oral': {
			const transits = search.absorptionDelayTransitsAll
				.filter((transit) => search.absorptionDelayTransits.has(transit))
				.map(String);
			return join(
				[
					`ABSORPTION([${join(
						search.absorptionRateAll.filter((rate) =>
							search.absorptionRate.has(rate),
						),
						',',
					)}])`,
					eliminationStatement,
					search.absorptionDelay.has('Lagtime') ? 'LAGTIME()' : '',
					transits.length === 0 ? '' : `TRANSITS([${join(transits, ',')}],*)`,
					peripheralsStatement,
					letCategoricalStatement,
					letContinuousStatement,
				],
				';',
			);
		}
	}
};

const minimumSupportedVersion = 'v0.85.0';

const snippet = (
	language: Language,
	model: ModelState,
	search: SearchState,
) => {
	const path = model.datainfoFilename?.replace(/\.[^.]+/, '.csv');
	// eslint-disable-next-line default-case
	switch (language) {
		case 'bash': {
			// TODO Find out what the syntax is
			return `pharmpy run ${path ?? '<filename>'} amd --foo bar ..`;
		}

		case 'python': {
			return join(
				[
					`from pharmpy.modeling import run_amd  # ${minimumSupportedVersion} or higher\n`,
					'run_amd(',
					join(
						[
							`  ${path === undefined ? 'filename' : JSON.stringify(path)}`,
							`  modeltype=${JSON.stringify(model.type)}`,
							Number.isNaN(model.popCl) ? '' : `  cl_init=${model.popCl}`,
							Number.isNaN(model.popVc) ? '' : `  vc_init=${model.popVc}`,
							model.type !== 'pk_oral' || Number.isNaN(model.popMat)
								? ''
								: `  mat_init=${model.popMat}`,
							`  search_space=${JSON.stringify(searchSpace(model, search))}`,
							Number.isNaN(model.lloq) ? '' : `  lloq=${model.lloq}`,
						],
						',\n',
					),
					')',
				],
				'\n',
			);
		}

		case 'r': {
			return join(
				[
					`library(pharmr)  # ${minimumSupportedVersion} or higher\n`,
					'run_amd(',
					join(
						[
							`  ${path === undefined ? 'filename' : JSON.stringify(path)}`,
							`  modeltype=${JSON.stringify(model.type)}`,
							Number.isNaN(model.popCl) ? '' : `  cl_init=${model.popCl}`,
							Number.isNaN(model.popVc) ? '' : `  vc_init=${model.popVc}`,
							model.type !== 'pk_oral' || Number.isNaN(model.popMat)
								? ''
								: `  mat_init=${model.popMat}`,
							`  search_space=${JSON.stringify(searchSpace(model, search))}`,
							Number.isNaN(model.lloq) ? '' : `  lloq=${model.lloq}`,
						],
						',\n',
					),
					')',
				],
				'\n',
			);
		}
	}
};

function Snippet() {
	const [language, setLanguage] = useLanguage();
	const [model] = useModel();
	const [search] = useSearch();

	const code = snippet(language, model, search);

	return (
		<Grid container spacing={2} padding={2}>
			<Grid item>
				<ButtonGroup disableElevation variant="contained" aria-label="language">
					{Object.entries(languages).map(([key, repr]) => (
						<Button
							key={key}
							disabled={language === key}
							onClick={() => {
								setLanguage(key as Language);
							}}
						>
							{repr}
						</Button>
					))}
				</ButtonGroup>
			</Grid>
			<Grid item xs={12}>
				<HighlightGrammar language={language} word={code} />
			</Grid>
		</Grid>
	);
}

export default Snippet;
