import {
	Home as HomeIcon,
	NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Link from './Link';

interface BreadCrumb {
	basename: React.ReactNode;
	path: string;
}

const home: BreadCrumb = {
	basename: (
		<IconButton>
			<HomeIcon />
		</IconButton>
	),
	path: '/',
};

interface BreadcrumbsProps {
	path: string;
}

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
