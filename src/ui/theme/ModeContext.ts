import type {SetStateAction} from 'react';
import type React from 'react';
import {createContext} from 'react';

import type {PaletteMode} from '@mui/material';

export type State = PaletteMode | undefined;

export type Dispatch = React.Dispatch<SetStateAction<State>>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModeContext = createContext<[State, Dispatch]>([
	undefined,
	() => {
		// NOTE no-op by default
	},
]);

export default ModeContext;
