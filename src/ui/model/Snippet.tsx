import React, {useState} from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const languages = {
	python: 'Python',
	R: 'R',
	cli: 'CLI',
} as const;

type Language = keyof typeof languages;

const defaultLanguage = 'python';

// eslint-disable-next-line react/hook-use-state
const useLanguage = () => useState<Language>(defaultLanguage);

function Snippet() {
	const [language, setLanguage] = useLanguage();
	return (
		<Paper sx={{height: 400}}>
			<Grid container spacing={2} padding={2}>
				<Grid item>
					<ButtonGroup variant="contained" aria-label="language">
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
			</Grid>
		</Paper>
	);
}

export default Snippet;
