import {useContext} from 'react';
import ModeContext from './ModeContext';

const useMode = () => useContext(ModeContext);

export default useMode;
