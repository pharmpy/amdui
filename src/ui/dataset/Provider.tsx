import React, {useEffect, useMemo, useState} from 'react';

import {OrderedMap as iOrderedMap} from 'immutable';
import mem from 'mem';

import type {PropsOf} from '@emotion/react/types/helper';
import type {Column, Type} from '../lib/datainfo/schema';
import type {Dispatch, State} from './Context';
import Context from './Context';

type ProviderProps = {
	name: string;
	delimiter: string;
	columns: string[];
} & Omit<PropsOf<typeof Context.Provider>, 'value'>;

const bestGuess = (_column: string): Type => {
	return 'unknown';
	// Const slug = column.toLowerCase();
	// if (slug === 'id') return 'id';
	// if (slug === 'time') return 'idv';
	// if (slug === 'amt') return 'dose';
	// if (slug.startsWith('dv')) return 'dv';
	// if (slug === 'visit') return 'occasion';
	// if (slug === 'apgr') return 'covariate - categorical';
	// if (slug === 'sex') return 'covariate - categorical';
	// if (slug === 'wgt') return 'covariate - continuous';
	// if (slug === 'bmi') return 'covariate - continuous';
	// return 'covariate - continuous';
};

function Provider({name, delimiter, columns, ...rest}: ProviderProps) {
	const [state, setState] = useState<State>({
		path: '',
		separator: '',
		columns: iOrderedMap<string, Column>([]),
	});

	useEffect(() => {
		setState({
			path: name,
			separator: delimiter,
			columns: iOrderedMap<string, Column>(
				columns.map((name) => [
					name,
					{
						name,
						type: bestGuess(name),
						unit: '1',
						continuous: true,
						scale: 'ratio',
						datatype: 'float64',
						descriptor: 'unknown',
					} as const,
				]),
			),
		});
	}, [name, delimiter, columns]);

	const dispatch = useMemo<Dispatch>(() => {
		return mem(
			(type, ...args) => {
				// eslint-disable-next-line default-case
				switch (type) {
					case 'path': {
						return (path: string) => {
							setState((state) => ({...state, path}));
						};
					}

					case 'separator': {
						return (separator: string) => {
							setState((state) => ({...state, separator}));
						};
					}

					case 'column': {
						const [name, key] = args as [string, keyof Column];
						return (value: Column[typeof key]) => {
							setState((state) => {
								const column = state.columns.get(name);
								if (column === undefined)
									throw new Error(`column ${name} missing`);
								return {
									...state,
									columns: state.columns.set(name, {...column, [key]: value}),
								};
							});
						};
					}
				}
			},
			{cacheKey: JSON.stringify},
		) as Dispatch;
	}, [setState]);

	const value = useMemo<[State, Dispatch]>(
		() => [state, dispatch],
		[state, dispatch],
	);

	return <Context.Provider value={value} {...rest} />;
}

export default Provider;
