import {useCallback} from 'react';
import saveTextAs from '../lib/output/saveTextAs';
import type {State} from './Context';

function useSave(state: State, filename: string) {
	return useCallback(() => {
		if (state.columns.size === 0) return;
		const text = JSON.stringify(
			{
				path: state.path,
				separator: state.separator,
				columns: Array.from(
					state.columns.values(),
					({continuous, categories, descriptor, drop, ...rest}) => ({
						...rest,
						continuous: continuous ? undefined : false,
						drop: drop ? true : undefined,
						descriptor: descriptor === 'unknown' ? undefined : descriptor,
						categories: categories?.length === 0 ? undefined : categories,
					}),
				),
			},
			undefined,
			2,
		);
		saveTextAs(text, filename);
	}, [filename, state]);
}

export default useSave;
