import { execSync } from "child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import path from "path";

// Load environment variables starting with PUBLIC_ into the environment,
// so we don't need to specify duplicate variables in .env
for (const key in process.env) {
  if (key.startsWith('PUBLIC_')) {
    process.env[key.substring(7)] = process.env[key];
  }
}
export const loadAccount = () => {
  const accountName = process.env.STELLAR_ACCOUNT;
  const secretKey = process.env.SOROBAN_SECRET_KEY;
  
  if (!accountName) {
    console.error("STELLAR_ACCOUNT environment variable is not set");
    process.exit(1);
  }
  
  if (!secretKey) {
    console.error("SOROBAN_SECRET_KEY environment variable is not set");
    process.exit(1);
  }
  
  console.log(`Adding Stellar key for account: ${accountName}`);
  
  // Create a temporary file with the secret key
  const tempKeyFile = '/tmp/soroban_secret.key';
  writeFileSync(tempKeyFile, secretKey);
  
  try {
    // Add the key with a proper name
    exe(`stellar keys add --secret-key ${tempKeyFile} ${accountName}`);
  } finally {
    // Clean up the temporary file
    rmSync(tempKeyFile);
  }
};

// Function to execute and log shell commands
export const exe = (command: string) => {
  console.log(command);
  return execSync(command, { stdio: 'inherit' });
};

export const buildContracts = () => {
  exe(`rm -f ./target/wasm32-unknown-unknown/release/*.wasm`);
  exe(`rm -f ./target/wasm32-unknown-unknown/release/*.d`);
  exe(`make build`);
};

/** Install all contracts and save their wasm hashes to .stellar */
export const installContracts = () => {
  const contractsDir = `./.stellar/contract-wasm-hash`;
  mkdirSync(contractsDir, { recursive: true });

  install('boundless_contract');
  // install('project_contract');
};

/* Install a contract */
const install = (contractName: string) => {
  exe(
    `stellar contract install \
--wasm ./target/wasm32-unknown-unknown/release/${contractName}.wasm \
--ignore-checks \
> ./.stellar/contract-wasm-hash/${contractName}.txt`,
  );
};

export const filenameNoExtension = (filename: string) => {
  return path.basename(filename, path.extname(filename));
};

export const readTextFile = (path: string): string => readFileSync(path, { encoding: 'utf8' }).trim();

// This is a function so its value can update during init.
// export const projectContractAddress = (): string =>
//   process.env.CONTRACT_ID_LOAN_MANAGER || readTextFile('./.stellar/contract-ids/project_contract.txt');
export const boundlessContract = (): string =>
  process.env.CONTRACT_ID_LOAN_MANAGER || readTextFile('./.stellar/contract-ids/boundless_contract.txt');

export const createContractBindings = () => {
  bind('boundless_contract', process.env.CONTRACT_ID_LOAN_MANAGER);
  // bind('project_contract', process.env.CONTRACT_ID_LOAN_MANAGER);
};

const bind = (contractName: string, address: string | undefined) => {
  const address_ = address || readTextFile(`./.stellar/contract-ids/${contractName}.txt`);
  exe(
    `stellar contract bindings typescript --contract-id ${address_} --output-dir ./packages/${contractName} --overwrite`,
  );
  exe(`cd ./packages/${contractName} && npm install && npm run build && cd ../..`);
};

export const createContractImports = () => {
  const CONTRACTS = ['boundless_contract'];
  CONTRACTS.forEach(importContract);
};

const importContract = (contractName: string) => {
  const outputDir = `./src/contracts/`;
  mkdirSync(outputDir, { recursive: true });

  /* eslint-disable quotes */
  /* eslint-disable no-constant-condition */
  const importContent =
    `import * as Client from '${contractName}'; \n` +
    `import { rpcUrl } from './util'; \n\n` +
    `export const contractId = Client.networks.${process.env.STELLAR_NETWORK}.contractId; \n\n` +
    `export const contractClient = new Client.Client({ \n` +
    `  ...Client.networks.${process.env.STELLAR_NETWORK}, \n` +
    `  rpcUrl, \n` +
    `${process.env.STELLAR_NETWORK === 'local' || 'standalone' ? `  allowHttp: true,\n` : null}` +
    `}); \n`;

  const outputPath = `${outputDir}/${contractName}.ts`;
  writeFileSync(outputPath, importContent);
  console.log(`Created import for ${contractName}`);
};
