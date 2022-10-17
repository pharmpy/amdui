import React, {useEffect, useState} from 'react';

import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {Check} from '@mui/icons-material';

import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import r from 'react-syntax-highlighter/dist/esm/languages/prism/r';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';
import light from 'react-syntax-highlighter/dist/esm/styles/prism/material-light';

import useMode from '../../theme/useMode';
import useIsMounted from '../component/useIsMounted';
import saveTextToClipboard from '../output/saveTextToClipboard';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('r', r);

type Props = {
	language: string;
	word: string;
};

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

const customStyle = {margin: 0, display: 'flex', flex: '1'};

type Style = typeof dark | typeof light;

function HighlightGrammar({language, word}: Props) {
	const isMounted = useIsMounted();

	const mode = useMode();
	const style: Style = mode === 'dark' ? dark : light;
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

	if (!isMounted()) {
		// NOTE We cannot highlight with the correct mode on the server
		return null;
	}

	return (
		<Paper variant="outlined" sx={{display: 'flex', position: 'relative'}}>
			<SyntaxHighlighter
				language={language}
				style={style}
				customStyle={customStyle}
			>
				{word}
			</SyntaxHighlighter>
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
		</Paper>
	);
}

export default HighlightGrammar;
