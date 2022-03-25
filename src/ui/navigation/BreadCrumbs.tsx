import {NavigateNext as NavigateNextIcon} from '@mui/icons-material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import React from 'react';
import Link from './Link';

interface BreadcrumbsProps {
	path: string;
}

const home = {
	basename: 'home',
	path: '/',
};

function Breadcrumbs({path}: BreadcrumbsProps) {
	const parts = path.split('/').filter((part) => part !== '');
	const breadcrumbs = [home].concat(
		parts.map((part, index) => ({
			basename: part,
			path: '/' + parts.slice(0, index + 1).join('/'),
		})),
	);
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
