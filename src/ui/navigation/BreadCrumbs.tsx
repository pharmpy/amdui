import {
	Home as HomeIcon,
	NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Link from './Link';

interface BreadCrumb {
	node: React.ReactNode;
	path: string;
}

const home: BreadCrumb = {
	node: (
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
		parts.map((part, index) => {
			const isLast = index === parts.length - 1;
			return {
				node: (
					<Chip
						label={part}
						clickable={!isLast}
						variant={isLast ? 'filled' : 'outlined'}
					/>
				),
				path: '/' + parts.slice(0, index + 1).join('/'),
			};
		}),
	);
	return (
		<MuiBreadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
		>
			{breadcrumbs.map(({node, path}) => (
				<Link key={path} to={path} underline="none" color="inherit">
					{node}
				</Link>
			))}
		</MuiBreadcrumbs>
	);
}

export default Breadcrumbs;
