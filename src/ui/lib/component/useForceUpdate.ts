import {useCallback, useState} from 'react';

const useForceUpdate = () => {
	// eslint-disable-next-line react/hook-use-state
	const [, updateState] = useState<Record<string, unknown>>();
	return useCallback(() => {
		updateState({});
	}, []);
};

export default useForceUpdate;
