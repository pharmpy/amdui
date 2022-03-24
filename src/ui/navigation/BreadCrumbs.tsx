import {NavigateNext as NavigateNextIcon} from '@mui/icons-material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import React from 'react';
import Link from './Link';

interface BreadcrumbsProps {
	location: Location;
}

function Breadcrumbs({location}: BreadcrumbsProps) {
	const parts = location.pathname === '/' ? [''] : location.pathname.split('/');
	const breadcrumbs = parts.map((part, index) => ({
		basename: index === 0 ? 'home' : part,
		path: '/' + parts.slice(1, index + 1).join('/'),
	}));
	return (
		<MuiBreadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
		>
			{breadcrumbs.map(({basename, path}) => (
				<Link key={path} to={path} underline="none" color="inherit">
					{basename}
				</Link>
			))}
		</MuiBreadcrumbs>
	);
}

export default Breadcrumbs;
