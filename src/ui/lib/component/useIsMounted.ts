import {useRef, useEffect, useState} from 'react';
import useForceUpdate from './useForceUpdate';

/**
 * See https://gist.github.com/jaydenseric/a67cfb1b809b1b789daa17dfe6f83daa
 *
 * Do not use to avoid warning when calling setState on an unmounted component.
 * See https://github.com/facebook/react/pull/22114
 */
const useIsMounted = () => {
	const componentIsMounted = useRef(false);
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		componentIsMounted.current = true;
		forceUpdate();
		return () => {
			componentIsMounted.current = false;
		};
	}, [forceUpdate]);

	return () => componentIsMounted.current;
};

export default useIsMounted;
