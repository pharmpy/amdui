import type React from 'react';
import {createContext} from 'react';

import {Set as iSet} from 'immutable';

export const init = () => {
	return {
		absorptionRate: iSet(['FO', 'ZO', 'Seq-ZO-FO']),
		absorptionRateDisabled: iSet(['FO']),
		absorptionRateAll: ['FO', 'ZO', 'Seq-ZO-FO'] as const,
		absorptionDelay: iSet(['Lagtime']),
		absorptionDelayAll: ['Lagtime'] as const,
		absorptionDelayTransits: iSet([1, 3, 10]),
		absorptionDelayTransitsAll: [1, 3, 10] as const,
		distributionCompartments: iSet([1, 2, 3]),
		distributionCompartmentsDisabled: iSet([1]),
		distributionCompartmentsAll: [1, 2, 3] as const,
		elimination: iSet(['FO', 'MM', 'MIX-FO-MM']),
		eliminationDisabled: iSet(['FO']),
		eliminationAll: ['FO', 'MM', 'ZO', 'MIX-FO-MM'] as const,
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

type InitAction = {
	type: 'init';
};

type Action = UpdateAction | InitAction;

export const reducer = (state: State, action: Action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case 'update': {
			return {...state, [action.key]: action.value};
		}

		case 'init': {
			return init();
		}
	}
};

export type Dispatch = React.Dispatch<Action>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const SearchContext = createContext<[State, Dispatch]>([
	init(),
	() => {
		// NOTE no-op by default
	},
]);

export default SearchContext;
