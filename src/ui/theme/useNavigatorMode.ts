import {PaletteMode} from '@mui/material';
import {useEffect, useState} from 'react';
import isBrowser from '../../lib/env';

const matchMediaDarkQuery = '(prefers-color-scheme: dark)';
const matchMediaLightQuery = '(prefers-color-scheme: light)';

const getCurrentNavigatorMode = (): PaletteMode | undefined => {
	if (isBrowser && window.matchMedia) {
		if (window.matchMedia(matchMediaDarkQuery).matches) {
			return 'dark';
		}

		if (window.matchMedia(matchMediaLightQuery).matches) {
			return 'light';
		}
	}

	return undefined;
};

const useNavigatorMode = (): PaletteMode | undefined => {
	const [mode, setMode] = useState<PaletteMode | undefined>(
		getCurrentNavigatorMode,
	);

	useEffect(() => {
		if (window.matchMedia) {
			const handler = (event: {matches: any}) => {
				setMode(event.matches ? 'dark' : 'light');
			};

			const matchDarkMode = window.matchMedia(matchMediaDarkQuery);
			matchDarkMode.addEventListener('change', handler);
			if (matchDarkMode.matches) {
				setMode('dark');
			}

			return () => {
				matchDarkMode.removeEventListener('change', handler);
			};
		}
	}, []);

	return mode;
};

export default useNavigatorMode;
