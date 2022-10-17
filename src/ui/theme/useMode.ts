import {useContext} from 'react';
import {useColorScheme} from '@mui/material/styles';

const useMode = () => {
	const {mode: colorSchemeMode, systemMode} = useColorScheme();
	return colorSchemeMode === 'system' ? systemMode : colorSchemeMode;
};

export default useMode;
