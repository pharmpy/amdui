import React from 'react';

import Box from '@mui/material/Box';

interface MainProps {
	children: React.ReactNode;
}

function Main({children}: MainProps) {
	// NOTE padding-bottom is used to make sure content can be scroll past FABs
	return <Box sx={{paddingBottom: 10}}>{children}</Box>;
}

export default Main;
