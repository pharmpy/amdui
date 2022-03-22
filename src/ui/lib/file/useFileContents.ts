import {useEffect, useState} from "react";

const useFileContents = (file: File|undefined) => {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setData('');
    setError(null);
    if (file === undefined) {
      setLoading(false);
      return;
    }
    setLoading(true);
    let cancelled = false;
    file.text().then((contents: string) => {
      if (cancelled) return;
      setData(contents)
    }, (error: any) => {
      if (cancelled) return;
      setError(error)
    }).then(() => {
      if (cancelled) return;
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [file]);

  return {
    loading,
    error,
    data
  };
};

export default useFileContents;
