import React, {createContext} from 'react';
import {Set as iSet} from 'immutable';

import {Column} from '../lib/datainfo/schema';

export interface State {
	datainfoFilename: string | undefined;
	columns: Column[];
	type: 'pk_oral' | 'pk_iv';
	popCl: number;
	popVc: number;
	popMat: number;
	lloq: number;
	categorical: iSet<number>;
	continuous: iSet<number>;
	categoricalAll: readonly number[];
	continuousAll: readonly number[];
}

export const init = ({
	dataInfo,
	columns = [],
}: {
	dataInfo?: File;
	columns?: Column[];
}): State => {
	// NOTE this is to handle columns with identical names
	const columnsIndexed = columns.map((column, index) => ({...column, index}));
	const covariates = columnsIndexed.filter(({type}) => type === 'covariate');
	const categoricalAll = covariates
		.filter(({scale}) => scale === 'nominal' || scale === 'ordinal')
		.map(({index}) => index);
	const continuousAll = covariates
		.filter(({continuous}) => continuous || continuous === undefined)
		.map(({index}) => index);
	return {
		datainfoFilename: dataInfo?.name,
		columns,
		type: 'pk_oral',
		popCl: Number.NaN,
		popVc: Number.NaN,
		popMat: Number.NaN,
		lloq: Number.NaN,
		categorical: iSet(categoricalAll),
		continuous: iSet(continuousAll),
		categoricalAll,
		continuousAll,
	};
};

type UpdateAction = {
	[K in keyof State]: {
		type: 'update';
		key: K;
		value: State[K];
	};
}[keyof State];

interface InitAction {
	type: 'init';
	dataInfo?: File;
	columns?: Column[];
}

type Action = UpdateAction | InitAction;

export const reducer = (state: State, action: Action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case 'update':
			return {...state, [action.key]: action.value};
		case 'init':
			return init(action);
	}
};

export type Dispatch = React.Dispatch<Action>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const Context = createContext<[State, Dispatch]>([
	init({}),
	() => {
		// NOTE no-op by default
	},
]);

export default Context;
