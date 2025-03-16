import 'dotenv/config';
import { mkdirSync } from "fs";
import { buildContracts, createContractBindings, createContractImports, exe, filenameNoExtension, installContracts, loadAccount } from "./util";

const account = process.env.STELLAR_ACCOUNT;

console.log('######################Initializing contracts ########################');

const deploy = (wasm: string) => {
  exe(
    `stellar contract deploy --wasm ${wasm} --ignore-checks > ./.stellar/contract-ids/${filenameNoExtension(wasm)}.txt`,
  );
};

const deployProjectContract = () => {
  const contractsDir = `.stellar/contract-ids`;
  mkdirSync(contractsDir, { recursive: true });

  deploy(`./target/wasm32-unknown-unknown/release/project_contract.wasm`);
};


loadAccount();
buildContracts();
installContracts();
deployProjectContract();
createContractBindings();
createContractImports();

console.log('\nInitialization successful!');
