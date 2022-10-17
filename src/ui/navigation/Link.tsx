import React from 'react';

import type {LinkProps as MuiLinkProps} from '@mui/material/Link';
import MuiLink from '@mui/material/Link';
import {Link as GatsbyLink} from 'gatsby';

function Link(props: MuiLinkProps<typeof GatsbyLink>) {
	return <MuiLink component={GatsbyLink} {...props} />;
}

export default Link;
