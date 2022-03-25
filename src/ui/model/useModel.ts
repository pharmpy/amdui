import {useContext} from 'react';
import ModelContext from './ModelContext';

const useModel = () => useContext(ModelContext);

export default useModel;
