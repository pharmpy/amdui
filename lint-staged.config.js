'use strict';

const fs = require('fs');

const tc = (paths) => {
	const encoding = 'utf8';
	const originalTSConfigPath = 'tsconfig.json';
	// NOTE: MUST be in same directory.
	const lintStagedTSConfigPath = 'lint-staged.tsconfig.json';
	const originalTSConfig = JSON.parse(
		fs.readFileSync(originalTSConfigPath, encoding),
	);
	const lintStagedTSConfig = {
		...originalTSConfig,
		include: ['types/**/*', ...paths],
	};
	fs.writeFileSync(lintStagedTSConfigPath, JSON.stringify(lintStagedTSConfig));
	return `yarn tc --project ${lintStagedTSConfigPath}`;
};

const lint = 'yarn lint-and-fix';
const lintConfig = 'yarn lint-config-and-fix';

module.exports = {
	'*.{js,jsx}': [lint],
	'*.{ts,tsx}': [lint, tc],
	'package.json': [lintConfig],
};
