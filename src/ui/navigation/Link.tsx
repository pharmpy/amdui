import React from 'react';

import MuiLink, {LinkProps as MuiLinkProps} from '@mui/material/Link';
import {Link as GatsbyLink} from 'gatsby';

function Link(props: MuiLinkProps<typeof GatsbyLink>) {
	return <MuiLink component={GatsbyLink} {...props} />;
}

export default Link;
