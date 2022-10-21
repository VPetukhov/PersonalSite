const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const sass = require("sass");

module.exports = function(config) {

	config.addWatchTarget('src/css/');

	config.addPassthroughCopy({ 'src/media/img': 'img' });
	config.addPassthroughCopy({ 'src/media/fonts': 'fonts' });
	config.addPassthroughCopy({ 'src/media/favicon': '/' });

	// Add plugins
	config.addPlugin(eleventyNavigationPlugin);

	return {
		dir: {
			input: 'src',
			data: 'data',
			layouts: 'layouts',
			includes: 'includes',
			output: 'build',
		},
		dataTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true,
		templateFormats: [
			'html', 'md', 'njk'
		],
	};

};
