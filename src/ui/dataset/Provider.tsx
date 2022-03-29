import React, {useEffect, useMemo, useState} from 'react';

import {OrderedMap as iOrderedMap} from 'immutable';

import {PropsOf} from '@emotion/react/types/helper';
import {Column, Type} from '../lib/datainfo/schema';
import Context, {Dispatch, State} from './Context';

interface ProviderProps
	extends Omit<PropsOf<typeof Context.Provider>, 'value'> {
	columns: string[];
}

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

function Provider({columns, ...rest}: ProviderProps) {
	const [state, setState] = useState<State>(iOrderedMap<string, Column>([]));

	useEffect(() => {
		setState(
			iOrderedMap<string, Column>(
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
		);
	}, [columns]);

	const dispatch = useMemo<Dispatch>(() => {
		const cache = new Map<string, (value: any) => void>();
		const dispatch: Dispatch = (name: string, key: keyof Column) => {
			const cacheKey = JSON.stringify([name, key]);
			const cached = cache.get(cacheKey);
			if (cached !== undefined) return cached;
			const cb = (value: Column[typeof key]) => {
				setState((state) => {
					const column = state.get(name);
					if (column === undefined) throw new Error(`column ${name} missing`);
					return state.set(name, {...column, [key]: value});
				});
			};

			cache.set(cacheKey, cb);
			return cb;
		};

		return dispatch;
	}, [setState]);

	const value = useMemo<[State, Dispatch]>(
		() => [state, dispatch],
		[state, dispatch],
	);

	return <Context.Provider value={value} {...rest} />;
}

export default Provider;
