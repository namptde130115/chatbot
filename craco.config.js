const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#ffa544',
              '@link-color': '#ffa544',
              '@border-radius-base': '10px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
