# Getting Started with Metaplex and Vite

This example makes an app with Metaplex with Vite, using React, VueJS, Svelte or any other framework supported by Vite.

This example has been generated using the following steps:

1. **Create a new project using Vite.**

   In order to install a different framework than React, simply replace the `--template` option with the framework of your choice, e.g. `--template vue`. Check out the [Vite documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) for more information on the available templates.

   ```sh
   npm create vite@latest getting-started-vite -- --template react
   cd getting-started-vite
   npm install
   ```

2. **Install the Metaplex and the Solana SDKs.**

   ```sh
   npm install @metaplex-foundation/js @solana/web3.js
   ```

3. **Install some polyfills.**

   <details>
     <summary>Why?</summary>
     Some dependencies of the Metaplex SDK are still relying on node.js features that are not available in the browser by default. To make sure that the Metaplex SDK works in the browser, we need to install some polyfills. Note that we are installing some polyfills via rollup plugins since Vite uses rollup under the hood the bundle for production.
   </details>

   ```sh
   npm install -D assert util crypto-browserify @esbuild-plugins/node-globals-polyfill rollup-plugin-node-polyfills
   ```

4. **Update your Vite configurations**.

   Replace the content of your `vite.config.js` file with the following code.

   If you've used a different template than `react`, make sure that you keep the original `plugins` array and its import statement — e.g. `import vue from "@vitejs/plugin-vue";` and `plugins: [vue()],`.

   ⚠️ An issue with Vite 3.x+ currently causes builds to fail with Metaplex, for your convenience a fix for this has been included in the config that uses the already built `near-api-js`.

   <details>
     <summary>Why?</summary>
     The main goal of all these changes is to polyfill node.js features that are not available by default in the browser. The configuration updates look slightly confusing because we have to polyfill differently for development and production. That's because Vite uses rollup under the hood to bundle the application for production but does not bundle your application at all in development.
   </details>

   ```js
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   // Or for other frameworks:
   // import { svelte } from "@sveltejs/vite-plugin-svelte";
   // etc.
   import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
   import nodePolyfills from "rollup-plugin-node-polyfills";

   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [react()], // Or svelte(), etc.
     resolve: {
       alias: {
         stream: "rollup-plugin-node-polyfills/polyfills/stream",
         events: "rollup-plugin-node-polyfills/polyfills/events",
         assert: "assert",
         crypto: "crypto-browserify",
         util: "util",
         'near-api-js': 'near-api-js/dist/near-api-js.js',
       },
     },
     define: {
       "process.env": process.env ?? {},
     },
     build: {
       target: "esnext",
       rollupOptions: {
         plugins: [nodePolyfills({ crypto: true })],
       },
     },
     optimizeDeps: {
       esbuildOptions: {
         plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
       },
     },
   });
   ```

5. **Update your `index.html`.**

   Add the following script in your `index.html` file.

   <details>
     <summary>Why?</summary>
     This will polyfill the missing `global` object in the browser when running the application in development.
     I really wish we didn't have to do this but there seem to be no Vite plugin available for that purpose.
   </details>

   ```diff
     <body>
       <div id="root"></div>
   +   <script>
   +     // Global node polyfill.
   +     window.global = window;
   +   </script>
       <script type="module" src="/src/main.jsx"></script>
     </body>
   ```

6. **That's it!** 🎉

   You're now ready to start building your app. You can use the following commands to build and serve your app.

   ```sh
   # Build and serve for development.
   npm run dev

   # Build and serve for production.
   npm run build && npm run preview
   ```

   If you're interested in how this example app is using the Metaplex SDK, check out the [`App.js`](./src/App.js) and [`App.css`](./src/App.css) files in the `src` directory.
