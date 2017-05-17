# GitHub Pages Source

Here's the code for SciHub's page. Uses the following technologies:

* [React](https://github.com/facebook/react)
* [React Router](https://github.com/ReactTraining/react-router)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css or sass.
* [Bootstrap](http://getbootstrap.com/)

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run start
```

Open a browser in http://localhost:9001 to see the page.

## Building Production Assets

```bash
npm run build
```

This will generate production ready files inside the folder `/docs`. The 
project is configured to serve the files from this directory.

