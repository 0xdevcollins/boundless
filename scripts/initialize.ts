import "dotenv/config";
import {
  CLI,
  exe,
  dirname,
  ensureDir,
  getContracts,
  removeFiles,
  filenameNoExtension,
  writeTextFile,
} from "./util";
import { sync as glob } from "glob";
import { mkdirSync } from "node:fs";

console.log("###################### Initializing ########################");

// Set contracts directory
const contractsDir = `${dirname}/../.stellar/contract-ids`;

// Fund all accounts
const fundAll = (): void => {
  exe(`${CLI} keys generate --fund ${process.env.STELLAR_ACCOUNT} || true`);
};

// Build contracts
const buildAll = (): void => {
  removeFiles(`${dirname}/../target/wasm32-unknown-unknown/release/*.wasm`);
  removeFiles(`${dirname}/../target/wasm32-unknown-unknown/release/*.d`);
  exe(`${CLI} contract build`);
};

// Deploy a single contract
const deploy = (wasm: string): void => {
  exe(`${CLI} contract deploy --wasm ${wasm} --ignore-checks --alias ${filenameNoExtension(wasm)}`);
};

// Deploy all contracts
const deployAll = (): void => {
  console.log("###################### Deploying ########################");
  // mkdirSync(contractsDir, {recursive: true})
  ensureDir(contractsDir);
  const wasmFiles = glob(`${dirname}/../target/wasm32-unknown-unknown/release/*.wasm`);
  wasmFiles.forEach(deploy);
};

// Bind contracts
const bind = ({ alias, id }: { alias: string; id: string }): void => {
  exe(
    `${CLI} contract bindings typescript --contract-id ${id} --output-dir ${dirname}/../packages/${alias} --overwrite`
  );
  exe(`cd ${dirname}/../packages/${alias} && npm install && npm run build`);
};

// Bind all contracts
const bindAll = (): void => {
  getContracts().forEach(bind);
};

// Import contract into the project
const importContract = ({ alias }: { alias: string }): void => {
  const outputDir = `${dirname}/../src/contracts/`;
  ensureDir(outputDir);

  const importContent = `
import * as Client from '${alias}';
import { rpcUrl } from './util';

export default new Client.Client({
  ...Client.networks.${process.env.STELLAR_NETWORK},
  rpcUrl,
  ${
    process.env.STELLAR_NETWORK === "local" || process.env.STELLAR_NETWORK === "standalone"
      ? "allowHttp: true,"
      : ""
  }
});
`;

  writeTextFile(`${outputDir}/${alias}.ts`, importContent);
  console.log(`Created import for ${alias}`);
};

// Import all contracts
const importAll = (): void => {
  getContracts().forEach(importContract);
};

// Execute workflow
fundAll();
buildAll();
deployAll();
bindAll();
importAll();
