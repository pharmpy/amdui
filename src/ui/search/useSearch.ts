import {useContext} from 'react';
import SearchContext from './SearchContext';

const useSearch = () => useContext(SearchContext);

export default useSearch;
