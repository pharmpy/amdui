const config = {
	pathPrefix: '/amdui',
	siteMetadata: {
		title: `AMD UI`,
		siteUrl: `https://pharmpy.github.io/amdui`,
	},
	plugins: [
		'gatsby-plugin-emotion',
		'gatsby-plugin-image',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-mdx',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: './src/pages/',
			},
		},
		{
			resolve: `gatsby-plugin-layout`,
			options: {
				component: require.resolve(`./src/layouts/default.tsx`),
			},
		},
	],
};

module.exports = config;
