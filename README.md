# hardhat-function-signature

Gets the Ethereum encoded function signatures

## What

This plugin get all the encoded function signatures from the solidity contracts
and prints them to the console.

## Installation


```bash
npm install hardhat-function-signatures
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-function-signatures");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-function-signatures";
```

## Required plugins

- [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers)

## Tasks


This plugin adds the function-signatures task to Hardhat:
```
Usage: hardhat [GLOBAL OPTIONS] function-signatures

function-signatures: Get function signatures for Contracts

```

