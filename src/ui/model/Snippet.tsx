import React, {useState} from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Grid from '@mui/material/Grid';
import HighlightGrammar from '../lib/text/HighlightGrammar';

const languages = {
	python: 'Python',
	r: 'R',
	bash: 'bash',
} as const;

type Language = keyof typeof languages;

const defaultLanguage = 'python';

// eslint-disable-next-line react/hook-use-state
const useLanguage = () => useState<Language>(defaultLanguage);

function Snippet() {
	const [language, setLanguage] = useLanguage();
	const code = `x = run_amd(a, b, c)`;
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
