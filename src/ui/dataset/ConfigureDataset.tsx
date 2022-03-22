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
import getCSV from "../../lib/csv/getCSV";
import CSV from "../../lib/csv/CSV";
import Grid from "@mui/material/Grid";
import DatasetColumnConfiguration from "./DatasetColumnConfiguration";

type Row = Record<string, any>;

const useCSV = (file: File|undefined) => {
  const [data, setData] = useState<CSV<Row> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setData(null);
    setError(null);
    if (file === undefined) {
      setLoading(false);
      return;
    }
    setLoading(true);
    let cancelled = false;
    getCSV<Row>(file).then((result) => {
      if (cancelled) return;
      setData(result)
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
    loading: loadingCSV,
    data: csv
  } = useCSV(dataset);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDataset(event.target.files?.[0]);
  };

  const text = `Choose dataset${dataset === undefined ? '' : ` (current: ${dataset.name})`}`;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <InputFileButton onChange={onChange}>
	<Button variant="contained" component="span" startIcon={<DataArrayIcon/>}>
	  {text}
	</Button>
      </InputFileButton>
      </Grid>
      {dataset === undefined ? null :
	<Grid item xs={12}>
	  <DatasetMetadataTable file={dataset}/>
	</Grid>
      }
      {csv === null ? null :
	  <Grid item xs={12}>
	    <DatasetColumnConfiguration columns={csv.meta.fields ?? []}/>
	  </Grid>
      }
      {dataset === undefined ? null :
	  <Grid item xs={12}>
	    <pre>
	      {loadingCSV ? 'loading...' : JSON.stringify(csv, undefined, 2)}
	    </pre>
	  </Grid>
      }
      </Grid>
  )
}

export default ConfigureDataset;
