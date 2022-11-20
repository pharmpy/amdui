# AMD UI

> [Try it now by clicking here!](https://pharmpy.github.io/amdui)

Tools (client-side only, no backend):
  - [Gatsby](https://www.gatsbyjs.com)
  - [TypeScript](https://www.typescriptlang.org)
  - [React](https://reactjs.org)
  - [Emotion](https://emotion.sh)
  - [MUI](https://mui.com)

## :wrench: Setup `dev` environment

Install [`node`](https://github.com/nodejs/node) `v18` or higher,
[`npm`](https://github.com/npm/cli) `v8` or higher, and
[`yarn`](https://classic.yarnpkg.com) `v1`.

> :warning: Note that `npm` is included in most distributions of `node`.

```shell
# Install dependencies and setup git hooks
yarn
```

## :woman_technologist: Develop

```shell
# Served at http://localhost:8000
yarn dev
```

> More info: https://www.gatsbyjs.com/docs/reference/gatsby-cli/#develop

## :package: Dependency management

> More info: `yarn cu --help` or https://github.com/raineorshine/npm-check-updates

### Check for updates

```shell
yarn cu
```

### Update `package.json` dependency keys

```shell
yarn up
```

## :building_construction: Production build

### Build it

```shell
yarn build
```

> More info: https://www.gatsbyjs.com/docs/reference/gatsby-cli/#build

### Serve it

```shell
# Served at http://localhost:9000
yarn serve
```

> More info: https://www.gatsbyjs.com/docs/reference/gatsby-cli/#serve

## :broom: Remove cache and production build folders

```shell
yarn clean
```

> More info: https://www.gatsbyjs.com/docs/reference/gatsby-cli/#clean

## :shirt: Source linting

> More info: `yarn lint --help` or https://github.com/xojs/xo

### Lint sources

```shell
yarn lint
```

### Format sources

```shell
# NOTE This is run automatically on commit.
yarn lint-and-fix
```

## :heavy_check_mark: Type checking

> More info: `yarn tc --help` or https://www.typescriptlang.org/docs

### Once

```shell
# NOTE This is run automatically on commit.
yarn tc
```

### Watch mode

```shell
yarn tc:watch
```
