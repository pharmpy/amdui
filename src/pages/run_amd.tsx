import type {ChangeEventHandler} from 'react';
import React, {useState} from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ModelConfiguration from '../ui/model/ModelConfiguration';
import Snippet from '../ui/amd/Snippet';
import SearchConfiguration from '../ui/search/SearchConfiguration';
import SearchProvider from '../ui/search/SearchProvider';
import ModelProvider from '../ui/model/ModelProvider';

// eslint-disable-next-line @typescript-eslint/naming-convention
function RunAMDPage() {
	const [dataInfo, setDataInfo] = useState<File | undefined>(undefined);
	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setDataInfo(event.target.files?.[0]);
	};

	return (
		<ModelProvider dataInfo={dataInfo}>
			<SearchProvider>
				<Grid container spacing={2} padding={2}>
					<Grid item xs={6}>
						<Paper sx={{display: 'flex'}}>
							<ModelConfiguration onChange={onChange} />
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper sx={{display: 'flex'}}>
							<SearchConfiguration />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper sx={{display: 'flex'}}>
							<Snippet />
						</Paper>
					</Grid>
				</Grid>
			</SearchProvider>
		</ModelProvider>
	);
}

export default RunAMDPage;
