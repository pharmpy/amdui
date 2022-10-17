import {useMemo} from 'react';
import {createTheme} from '@mui/material/styles';

const useTheme = () => {
	return useMemo(() => createTheme(), []);
};

export default useTheme;
