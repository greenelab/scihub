# GitHub Pages Source

Here's the code for SciHub's page. Uses the following technologies:

* [Webpack](http://webpack.github.io) for bundling
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css or sass.


## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run start
```

## Building Production Assets

```bash
npm run build
```

This will generate production ready files inside the folder `/docs/build`

## Deploying to Github Pages

```bash
npm run deploy
```

This will compile the project's assets and publish them to the `gh-pages` branch of the 
`origin` repository.


