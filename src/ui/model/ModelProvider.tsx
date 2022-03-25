import React, {useEffect, useMemo, useReducer} from 'react';

import {PropsOf} from '@emotion/react/types/helper';
import {Column} from '../lib/datainfo/schema';
import ModelContext, {Dispatch, reducer, State, init} from './ModelContext';

interface ProviderProps
	extends Omit<PropsOf<typeof ModelContext.Provider>, 'value'> {
	columns: Column[];
}

function ModelProvider({columns, ...rest}: ProviderProps) {
	const [state, dispatch] = useReducer(reducer, columns, init);

	useEffect(() => {
		dispatch({type: 'init', columns});
	}, [columns]);

	const value = useMemo<[State, Dispatch]>(
		() => [state, dispatch],
		[state, dispatch],
	);

	return <ModelContext.Provider value={value} {...rest} />;
}

export default ModelProvider;
