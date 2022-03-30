import {PaletteMode, useMediaQuery} from '@mui/material';

const useNavigatorMode = (): PaletteMode =>
	useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

export default useNavigatorMode;
