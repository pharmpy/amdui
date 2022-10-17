import React, {useMemo, useReducer} from 'react';

import type {PropsOf} from '@emotion/react/types/helper';
import type {Dispatch, State} from './SearchContext';
import SearchContext, {reducer, init} from './SearchContext';

type ProviderProps = Omit<PropsOf<typeof SearchContext.Provider>, 'value'>;

function SearchProvider(props: ProviderProps) {
	const [state, dispatch] = useReducer(reducer, undefined, init);

	const value = useMemo<[State, Dispatch]>(
		() => [state, dispatch],
		[state, dispatch],
	);

	return <SearchContext.Provider value={value} {...props} />;
}

export default SearchProvider;
