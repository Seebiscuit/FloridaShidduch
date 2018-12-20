const path = require("path");
const fsExtra = require("fs-extra");
const klawSync = require("klaw-sync");

const targetPaths = [
  path.resolve(__dirname, "src", "behaviors"),
  path.resolve(__dirname, "src", "models"),
  path.resolve(__dirname, "src", "views", "apply", "Register.js"),
  path.resolve(__dirname, "src", "views", "apply", "Questionnaire.js")
];
// Required to ensure the walker hits the dirs where the req files will be
const traverseDirs = [
  path.resolve(__dirname, "src", "behaviors"),
  path.resolve(__dirname, "src", "models"),
  path.resolve(__dirname, "src", "views"),
  path.resolve(__dirname, "src", "views", "apply")
];


fsExtra.outputFileSync(
  "app.build.js",
  `(${JSON.stringify(getConfigObject())})`
);

function getConfigObject() {
  const paths = klawSync(path.resolve(__dirname, "src"), {
    filter: children => {
      return traverseDirs.some(p => (children.path || "").indexOf(p) > -1);
    }
  })
    .filter(children => targetPaths.some(p => (children.path || "").indexOf(p) > -1) &&  /^.*[.]js$/.test(children.path))
    .map(children =>
      children.path
        .replace(`${__dirname}\\src\\`, "")
        .replace(/\\/g, "/")
        .replace(/[.]js$/, "")
    );

  return {
    baseUrl: "src/",
    mainConfigFile: "src/config.js",
    name: "config",
    out: "dist/main.min.js",
    include: paths,

    optimizeCss: "standard",

    // Wraps all scripts in an IIFE (Immediately Invoked Function Expression)
    // (function() { + content + }());
    wrap: true,
    preserveLicenseComments: false,
    // Uses uglify.js for minification
    optimize: "none",
    uglify: {
      toplevel: true,
      ascii_only: true,
      beautify: false,
      max_line_length: 1000
    },
    inlineText: true,
    text: {
      removeWhitespace: true
    },
    tpl: {
      removeWhitespace: true
    },

    //useStrict: false,
    skipPragmas: false,
    skipModuleInsertion: false,

    stubModules: ["text"],
    optimizeAllPluginResources: false,
    findNestedDependencies: true,
    removeCombined: false,
    fileExclusionRegExp: /^\./,
    logLevel: 0
  };
}
