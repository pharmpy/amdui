import {createContext} from 'react';

import {OrderedMap as iOrderedMap} from 'immutable';

import {Column} from '../lib/datainfo/schema';

export type State = iOrderedMap<string, Column>;

export type Dispatch = (
	column: string,
	key: keyof Column,
) => (value: Column[typeof key]) => void;

// eslint-disable-next-line @typescript-eslint/naming-convention
const Context = createContext<[State, Dispatch]>([
	iOrderedMap<string, Column>([]),
	() => () => {
		// NOTE no-op by default
	},
]);

export default Context;
