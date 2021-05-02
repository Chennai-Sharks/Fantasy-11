const withImages = require('next-images');
module.exports = withImages({});
module.exports = {
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
};
