<div align="center">
    <img src="./docs/engine.png" alt="Logo" width="200"/>
    <h1>Slope Engine</h1>
    <h3>Engine for the Slope route modelisation</h3>
    <a href="https://slope.netlify.app">Website</a> &mdash; <a href="https://docs.slope.netlify.app">Documentation</a> &mdash; <a href="./LICENSE">License</a>
</div>

- [📥 Getting started](#-getting-started)
- [🔬 API](#-api)
- [💻 Development](#-development)
  - [Installation](#installation)
  - [Test the package](#test-the-package)
  - [Build the package](#build-the-package)
- [📜 Credits](#-credits)
- [🔐 License](#-license)

## 📥 Getting started

Install this package and add it to your project :

```bash
npm i slope-engine     # Using NPM
yarn add slope-engine  # Using Yarn
```

## 🔬 API

TODO

## 💻 Development

Thank you for being interested in Slope Engine's development! Please follow these instructions in order to get started.

### Installation

You must have a recent Node.js version installed (recommended: v12+) and Git in any form : CLI, UI, GitHub...

Clone the repository on your local machine :

```bash
git clone https://github.com/exybore/slope-engine.git  # Via HTTP
git clone git@github.com:exybore/slope-engine          # Via SSH
```

Install the required dependencies to build and test Slope Engine :

```bash
npm i         # Using NPM
yarn install  # Using Yarn
```

### Test the package

The [Jest](https://jestjs.io/) framework powers tests, which are stored in individual files inside the [tests folder](./tests).

Run tests on the package using the `test` script :

```bash
npm run test  # Using NPM
yarn test     # Using Yarn
```

### Build the package

The [src folder](./src) contains all the main code, and the entry point is the [index.js file](./src/index.js). A build system powered by [rollup](https://www.rollupjs.org/) in order to minify code and merge imports into a single file.

Build the package using the `build` script :

```bash
npm run build  # Using NPM
yarn build     # Using Yarn
```

## 📜 Credits

- Maintainer: [exybore](https://github.com/exybore)

## 🔐 License

GNU GPL v3. See [license](https://github.com/exybore/slope-engine/tree/master/LICENSE)
