import React, {useEffect, useMemo, useState} from 'react';
import {PropsOf} from '@emotion/react/types/helper';
import {PaletteMode} from '@mui/material';
import ModeContext, {Dispatch, State} from './ModeContext';
import useNavigatorMode from './useNavigatorMode';

interface ModeProviderProps
	extends Omit<PropsOf<typeof ModeContext.Provider>, 'value'> {}

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
