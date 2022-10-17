import React, {useEffect, useMemo, useState} from 'react';
import type {PropsOf} from '@emotion/react/types/helper';
import type {PaletteMode} from '@mui/material';
import type {Dispatch, State} from './ModeContext';
import ModeContext from './ModeContext';
import useNavigatorMode from './useNavigatorMode';

type ModeProviderProps = Record<string, unknown> &
	Omit<PropsOf<typeof ModeContext.Provider>, 'value'>;

function ModeProvider(props: ModeProviderProps) {
	const init = useNavigatorMode();
	const [mode, setMode] = useState<PaletteMode | undefined>(init);

	useEffect(() => {
		setMode(init);
	}, [init]);

	const value = useMemo<[State, Dispatch]>(
		() => [mode, setMode],
		[mode, setMode],
	);

	return <ModeContext.Provider value={value} {...props} />;
}

export default ModeProvider;
