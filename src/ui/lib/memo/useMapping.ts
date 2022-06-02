import {DependencyList, useCallback, useEffect, useState} from 'react';

const useMapping = <K, V>(map: (key: K) => V, deps?: DependencyList) => {
	const [cache, setCache] = useState<Map<K, V>>(() => new Map());

	useEffect(() => {
		setCache(new Map());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return useCallback(
		(key: K) => {
			const cached = cache.get(key);
			if (cached !== undefined) return cached;
			const value = map(key);
			cache.set(key, value);
			return value;
		},
		deps === undefined ? [cache] : [cache, ...deps],
	);
};

export default useMapping;
