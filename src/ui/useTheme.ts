import {useMemo} from 'react';
import {createTheme} from '@mui/material/styles';

import useMode from './theme/useMode';

const useTheme = () => {
	const [mode] = useMode();
	console.debug('useTheme', {mode});
	return useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode],
	);
};

export default useTheme;
