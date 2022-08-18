# Getting Started with Metaplex and Esbuild

This example sets up a new React app with Metaplex using Esbuild.

This example has been generated using the following steps:

1. **Create a new project using NPM.**

   Esbuild does not have any standard template for React which can be utilized for initializing the project like CRA or Vite. So, we will be creating an empty npm project and setup everything from scratch.

   ```sh
   mkdir getting-started-react-esbuild
   cd getting-started-react-esbuild
   npm init -y
   ```

   Once the empty npm project is ready, we will set up a basic directory structure with mainly `public` and `src` folders and a config file (`build.js`) which will be used for compiling and bundling the react app with esbuild.

   ```
   getting-started-react-esbuild/
   ├── public/
   │   └── index.html
   ├── src/
   │   ├── app.jsx
   │   ├── index.css
   │   └── index.js
   ├── build.js
   └── package.json
   ```

2. **Install React, EsBuild and the Metaplex SDK.**

   ```sh
   npm install react react-dom esbuild @metaplex-foundation/js @solana/web3.js
   ```

3. **Install some polyfills.**

   <details>
     <summary>Why?</summary>
     Some dependencies of the Metaplex SDK are still relying on NPM packages that are not available in the browser. To make sure that the Metaplex SDK works in the browser, we need to install some polyfills.
   </details>

   ```sh
   npm install -D node-stdlib-browser
   ```

4. **Install Servor for Development**

    <details>
     <summary>Why?</summary>
     Esbuild does not include any server that could be used to preview our app in the browser. So we will be using servor for that.
   </details>

   ```sh
   npm install -D servor
   ```

5. **Update your build.js file**.

   Add the following code to the `build.js` file we created earlier.

   <details>
     <summary>Why?</summary>
     The following code will build and bundle your react app with EsBuild. It will also start a dev server when used in development.
   </details>

   ```js
   const esbuild = require('esbuild');
   const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');
   const stdLibBrowser = require('node-stdlib-browser');
   const fs = require('fs');
   const path = require('path');
   const servor = require('servor');

   const outdirectory = 'public';

   // Clean previously built assets.
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
   ```

6. **Update your `package.json`.**

   Add the following scripts to your `package.json` file.

   ```diff
   "scripts": {
   +   "build": "node build.js -build",
   +   "dev": "node build.js -watch"
   },
   ```

7. **Update your `index.html`.**

   Add the following code in your `index.html` file.

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <meta name="theme-color" content="#000000" />
       <meta name="description" content="EsBuild + Metaplex" />
       <title>EsBuild + Metaplex</title>
       <script src="index.js" async defer></script>
       <link rel="stylesheet" href="index.css" />
     </head>
     <body>
       <noscript>You need to enable JavaScript to run this app.</noscript>
       <div id="root"></div>
     </body>
   </html>
   ```

8. **That's it!** 🎉

   You're now ready to start building your app. You can use the following commands to build and serve your app.

   ```sh
   # Build and serve for development.
   npm run dev

   # Build for production.
   npm run build
   ```

   If you're interested in how this example app is using the Metaplex SDK, check out the [`App.jsx`](./src/App.jsx) and [`App.css`](./src/App.css) files in the `src` directory.
