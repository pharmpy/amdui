import {createContext} from 'react';

import {OrderedMap as iOrderedMap} from 'immutable';

import type {Column} from '../lib/datainfo/schema';

export type State = {
	columns: iOrderedMap<string, Column>;
	path: string;
	separator: string;
};

export type Dispatch = {
	(type: 'path'): (path: string) => void;
	(type: 'separator'): (separator: string) => void;
	(type: 'column', column: string, key: keyof Column): (
		value: Column[typeof key],
	) => void;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const Context = createContext<[State, Dispatch]>([
	{
		path: '',
		separator: '',
		columns: iOrderedMap<string, Column>([]),
	},
	() => () => {
		// NOTE no-op by default
	},
]);

export default Context;
