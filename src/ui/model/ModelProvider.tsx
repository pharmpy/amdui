import React, {useEffect, useMemo, useReducer} from 'react';

import type {PropsOf} from '@emotion/react/types/helper';
import useFile from '../../lib/file/useFile';
import type {Column, DataInfo} from '../lib/datainfo/schema';
import type {Dispatch, State} from './ModelContext';
import ModelContext, {reducer, init} from './ModelContext';

type ProviderProps = {
	dataInfo?: File;
} & Omit<PropsOf<typeof ModelContext.Provider>, 'value'>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const loadJSON = async (file: File) =>
	JSON.parse(await file.text()) as DataInfo;

const noColumns: Column[] = [];

function ModelProvider({dataInfo, ...rest}: ProviderProps) {
	const useColumns = (file: File | undefined) => useFile(file, loadJSON);

	const {data} = useColumns(dataInfo);

	const columns = data?.columns ?? noColumns;

	const [state, dispatch] = useReducer(reducer, {dataInfo, columns}, init);

	useEffect(() => {
		dispatch({type: 'init', dataInfo, columns});
	}, [dataInfo, columns]);

	const value = useMemo<[State, Dispatch]>(
		() => [state, dispatch],
		[state, dispatch],
	);

	return <ModelContext.Provider value={value} {...rest} />;
}

export default ModelProvider;
