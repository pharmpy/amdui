import React, {ChangeEventHandler, useEffect, useState} from "react";

import {styled} from "@mui/material/styles";

import Button from "@mui/material/Button";
import DataArrayIcon from '@mui/icons-material/DataArray';

const Input = styled('input')({
  display: 'none',
});

import Paper from "@mui/material/Paper";
import InputFileButton from "../lib/input/InputFileButton";
import Typography from "@mui/material/Typography";
import DatasetMetadataTable from "./DatasetMetadataTable";

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

const ConfigureDataset = () => {
  const [dataset, setDataset] = useState<File|undefined>(undefined);
  const {
    loading: loadingContents,
    data: contents
  } = useFileContents(dataset);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDataset(event.target.files?.[0]);
  };

  const text = `Choose dataset${dataset === undefined ? '' : ` (current: ${dataset.name})`}`;
  return (
    <>
      <InputFileButton onChange={onChange}>
	<Button variant="contained" component="span" startIcon={<DataArrayIcon/>}>
	  {text}
	</Button>
      </InputFileButton>
      {dataset === undefined ? null : 
	<DatasetMetadataTable file={dataset}/>
      }
      <pre>
	{loadingContents ? 'loading...' : contents}
      </pre>
    </>
  )
}

export default ConfigureDataset;
