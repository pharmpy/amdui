import React, {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {Check} from '@mui/icons-material';
import saveTextToClipboard from '../output/saveTextToClipboard';

interface Props {
	language: string;
	word: string;
}

const init = '';
const success = 'Copied to clipboard';
const error = 'Could not copy to clipboard, try manually';

type State = typeof init | typeof success | typeof error;

function CopyToClipboardIcon({state}: {state: State}) {
	// eslint-disable-next-line default-case
	switch (state) {
		case init:
			return <ContentCopyIcon />;
		case success:
			return <Check />;
		case error:
			return <ErrorOutlineIcon />;
	}
}

const copyToClipboardColor = (state: State) => {
	// eslint-disable-next-line default-case
	switch (state) {
		case init:
			return undefined;
		case success:
			return 'success';
		case error:
			return 'error';
	}
};

function HighlightGrammar({language, word}: Props) {
	const [tooltipText, setTooltipText] = useState<State>(init);
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => {
		setTooltipText(init);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setTooltipText(init);
		setOpen(false);
	}, [language, word]);
	return (
		<Paper variant="outlined" sx={{display: 'flex', position: 'relative'}}>
			<Tooltip
				open={open}
				title={tooltipText}
				placement="left"
				onClose={handleClose}
				onOpen={handleOpen}
			>
				<Button
					variant="outlined"
					color={copyToClipboardColor(tooltipText)}
					sx={{
						position: 'absolute',
						top: '.5em',
						right: '.5em',
						padding: '.5em .4em',
						minWidth: 0,
					}}
					onClick={async () => {
						try {
							await saveTextToClipboard(word);
							setTooltipText(success);
						} catch {
							setTooltipText(error);
						} finally {
							setOpen(true);
						}
					}}
				>
					<CopyToClipboardIcon state={tooltipText} />
				</Button>
			</Tooltip>
			<Box sx={{padding: 2}}>
				<pre style={{margin: 0}}>{word}</pre>
			</Box>
		</Paper>
	);
}

export default HighlightGrammar;
