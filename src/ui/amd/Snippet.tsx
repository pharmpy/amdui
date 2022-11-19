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

const searchSpace = (type: 'pk_iv' | 'pk_oral', search: SearchState) => {
	const peripherals = search.distributionCompartmentsAll
		.filter((x) => x !== 1 && search.distributionCompartments.has(x))
		.map((x) => String(x - 1));
	const elimination = search.eliminationAll.filter((elimination) =>
		search.elimination.has(elimination),
	);
	// eslint-disable-next-line default-case
	switch (type) {
		case 'pk_iv': {
			return join(
				[
					`ELIMINATION([${join(elimination, ',')}])`,
					peripherals.length === 0
						? ''
						: `PERIPHERALS([${join(peripherals, ',')}])`,
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
					`ELIMINATION([${join(elimination, ',')}])`,
					search.absorptionDelay.has('Lagtime') ? 'LAGTIME()' : '',
					transits.length === 0 ? '' : `TRANSITS([${join(transits, ',')}],*)`,
					peripherals.length === 0
						? ''
						: `PERIPHERALS([${join(peripherals, ',')}])`,
				],
				';',
			);
		}
	}
};

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
					`from pharmpy.modeling import run_amd\n`,
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
							`  search_space=${JSON.stringify(
								searchSpace(model.type, search),
							)}`,
							Number.isNaN(model.lloq) ? '' : `  lloq=${model.lloq}`,
							model.categorical.size === 0
								? ''
								: `  categorical=${JSON.stringify(
										model.categorical
											.map((index) => model.columns[index].name)
											.toArray(),
								  )}`,
							model.continuous.size === 0
								? ''
								: `  continuous=${JSON.stringify(
										model.continuous
											.map((index) => model.columns[index].name)
											.toArray(),
								  )}`,
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
					`library(pharmr)\n`,
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
							`  search_space=${JSON.stringify(
								searchSpace(model.type, search),
							)}`,
							Number.isNaN(model.lloq) ? '' : `  lloq=${model.lloq}`,
							model.categorical.size === 0
								? ''
								: `  categorical=c(${JSON.stringify(
										model.categorical
											.map((index) => model.columns[index].name)
											.toArray(),
								  ).slice(1, -1)})`,
							model.continuous.size === 0
								? ''
								: `  continuous=c(${JSON.stringify(
										model.continuous
											.map((index) => model.columns[index].name)
											.toArray(),
								  ).slice(1, -1)})`,
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
