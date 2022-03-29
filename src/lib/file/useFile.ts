import {useEffect, useState} from 'react';

type FileLoader<R> = (file: File) => Promise<R>;

const useFile = <R>(file: File | undefined, load: FileLoader<R>) => {
	const [data, setData] = useState<R | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | undefined>(undefined);
	useEffect(() => {
		setData(undefined);
		setError(undefined);
		if (file === undefined) {
			setLoading(false);
			return;
		}

		setLoading(true);
		let cancelled = false;
		load(file).then(
			(result) => {
				if (cancelled) return;
				setData(result);
				setLoading(false);
			},
			(error: any) => {
				if (cancelled) return;
				setError(error);
				setLoading(false);
			},
		);

		return () => {
			cancelled = true;
		};
	}, [load, file]);

	return {
		loading,
		error,
		data,
	};
};

export default useFile;
