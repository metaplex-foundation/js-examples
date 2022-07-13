const esbuild = require('esbuild');
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');
const stdLibBrowser = require('node-stdlib-browser');
const fs = require('fs');
const path = require('path');
const servor = require('servor');

const outdirectory = 'public';

//clear out any old JS or CSS
fs.readdir(outdirectory, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if (
      file.endsWith('.js') ||
      file.endsWith('.css') ||
      file.endsWith('.js.map')
    ) {
      fs.unlink(path.join(outdirectory, file), (err) => {
        if (err) throw err;
      });
    }
  }
});

async function dev() {
  console.log('Building development bundle ⏳');
  await esbuild.build({
    entryPoints: ['src/index.js'],
    outdir: outdirectory,
    bundle: true,
    define: {
      'process.env.NODE_ENV': '"development"',
      global: 'global',
      process: 'process',
      Buffer: 'Buffer',
    },
    minify: false,
    watch: true,
    inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
    plugins: [plugin(stdLibBrowser)],
    loader: {
      '.js': 'jsx',
    },
  });
  console.log('Development bundle built ✅');
  console.log('Running server from: http://localhost:8000');
  await servor({
    browser: true,
    root: outdirectory,
    port: 8000,
  });
}

async function prod() {
  console.log('Build started ⏳');
  await esbuild.build({
    entryPoints: ['src/index.js'],
    outdir: outdirectory,
    bundle: true,
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'global',
      process: 'process',
      Buffer: 'Buffer',
    },
    minify: true,
    inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
    plugins: [plugin(stdLibBrowser)],
    loader: {
      '.js': 'jsx',
    },
  });
  console.log('Build completed ✅');
}

//defaults to build
let config = '-build';
if (process.argv.length > 2) {
  config = process.argv[2];
}

// Builds the bundle for dvelopment and runs a local web server 
// with livereload when -watch is set
config === '-watch' && dev();

// Builds optimized bundle for production
config === '-build' && prod();