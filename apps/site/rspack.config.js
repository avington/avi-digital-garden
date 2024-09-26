const { composePlugins, withNx, withReact } = require('@nx/rspack');
const { DefinePlugin } = require('@rspack/core');

const portalAppEnvironmentVariables = Object.keys(process.env).filter((key) =>
  /^NX_PUBLIC_\w+/.test(key),
);

module.exports = composePlugins(withNx(), withReact(), (config) => {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      new DefinePlugin({
        'process.env': portalAppEnvironmentVariables.reduce((acc, key) => {
          acc[key] = JSON.stringify(process.env[key]);
          return acc;
        }, {}),
      }),
    ],
  };
});