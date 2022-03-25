import React, {createContext} from 'react';
import {Seq as iSeq} from 'immutable';

import {Column} from '../lib/datainfo/schema';

export const init = (columns: Column[]) => {
	// NOTE this is to handle columns with identical names
	const columnsIndexed = columns.map((column, index) => ({...column, index}));
	const covariates = columnsIndexed.filter(({type}) => type === 'covariate');
	const categoricalAll = iSeq(
		covariates
			.filter(({scale}) => scale === 'nominal' || scale === 'ordinal')
			.map(({index}) => index),
	);
	const continuousAll = iSeq(
		covariates
			.filter(({continuous}) => continuous || continuous === undefined)
			.map(({index}) => index),
	);
	return {
		type: 'pk_oral',
		popCl: '',
		popVc: '',
		popMat: '',
		lloq: '',
		categorical: categoricalAll,
		continuous: continuousAll,
		categoricalAll,
		continuousAll,
	};
};

export type State = ReturnType<typeof init>;

type UpdateAction = {
	[K in keyof State]: {
		type: 'update';
		key: K;
		value: State[K];
	};
}[keyof State];

interface InitAction {
	type: 'init';
	columns: Column[];
}

type Action = UpdateAction | InitAction;

export const reducer = (state: State, action: Action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case 'update':
			return {...state, [action.key]: action.value};
		case 'init':
			return init(action.columns);
	}
};

export type Dispatch = React.Dispatch<Action>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const Context = createContext<[State, Dispatch]>([
	init([]),
	() => {
		// NOTE no-op by default
	},
]);

export default Context;
