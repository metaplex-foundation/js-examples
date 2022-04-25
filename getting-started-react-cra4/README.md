# Getting Started with Metaplex and CRA 4

This example sets up a new React app with Metaplex using "Create React App" (CRA) version 4 — i.e. using Webpack 4. Note that, if you're starting a new project, we recommend using CRA 5 which uses Webpack 5.

This example has been generated using the following steps:

1. **Create a new project using the "Create React App" command.**
    ```sh
    npx create-react-app getting-started-react-cra4 --scripts-version 4.0.3
    cd getting-started-react-cra4
    ```

2. **Install the Metaplex and the Solana SDKs.**
    ```sh
    npm install @metaplex-foundation/js-next @solana/web3.js
    ```

3. **Install and use `react-app-rewired`**.
    This enables us to override some Webpack configurations in the next step.
    ```sh
    # Installs react-app-rewired.
    npm install react-app-rewired

    # Replaces "react-scripts" with "react-app-rewired" in package.json scripts.
    sed -i '' 's/react-scripts /react-app-rewired /g' package.json
    ```

4. **Override Webpack 4 configurations.**
    Create a new file to override Webpack 4 configurations.
    ```sh
    touch config-overrides.js
    ```

    Copy the following code inside the new `config-overrides.js` file.
    ```js
    module.exports = function override(webpackConfig) {
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });
      return webpackConfig;
    };
    ```

5. **Update your browser requirements.**
    <details>
      <summary>Why?</summary>
      This is a test.

      ```sh
      long console output here
      ```
    </details>
    ```diff
    "browserslist": {
      "production": [
    -     ">0.2%",
    -     "not dead",
    -     "not op_mini all"
    +     "chrome >= 67",
    +     "edge >= 79",
    +     "firefox >= 68",
    +     "opera >= 54",
    +     "safari >= 14"
      ],
        "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    },
    ```
