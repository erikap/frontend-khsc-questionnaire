'use strict';;
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const {
  compatBuild
} = require("@embroider/compat");

module.exports = async function(defaults) {
  const {
    buildOnce
  } = await import("@embroider/vite");

  const app = new EmberApp(defaults, {
    svgJar: {
      sourceDirs: ['node_modules/bootstrap-icons/icons'],
    }
  });

  return compatBuild(app, buildOnce);
};
