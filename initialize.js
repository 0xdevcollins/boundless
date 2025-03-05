import "dotenv/config";
import { mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";

// Load environment variables starting with PUBLIC_ into the environment,
// so we don't need to specify duplicate variables in .env
for (const key in process.env) {
	if (key.startsWith("PUBLIC_")) {
		process.env[key.substring(7)] = process.env[key];
	}
}

console.log("###################### Initializing ########################");

// Get dirname (equivalent to the Bash version)
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const contractsDir = `${dirname}/.stellar/contract-ids`;

// variable for later setting pinned version of soroban in "$(dirname/target/bin/soroban)"
const cli = "stellar";

// Function to execute and log shell commands
function exe(command) {
	console.log(command);
	execSync(command, { stdio: "inherit" });
}

function fundAll() {
	exe(`${cli} keys generate --fund ${process.env.STELLAR_ACCOUNT} | true`);
}

function removeFiles(pattern) {
	console.log(`remove ${pattern}`);
	for (const entry of glob(pattern)) {
		rmSync(entry);
	}
}

function buildAll() {
	removeFiles(`${dirname}/target/wasm32-unknown-unknown/release/*.wasm`);
	removeFiles(`${dirname}/target/wasm32-unknown-unknown/release/*.d`);
	exe(`${cli} contract build`);
}

function filenameNoExtension(filename) {
	return path.basename(filename, path.extname(filename));
}

function deploy(wasm) {
	exe(
		`${cli} contract deploy --wasm ${wasm} --ignore-checks --alias ${filenameNoExtension(
			wasm,
		)}`,
	);
}

function deployAll() {
	mkdirSync(contractsDir, { recursive: true });

	const wasmFiles = glob(
		`${dirname}/target/wasm32-unknown-unknown/release/*.wasm`,
	);

	wasmFiles.forEach(deploy);
}

function contracts() {
	const contractFiles = glob(`${contractsDir}/*.json`);

	return contractFiles
		.map((path) => ({
			alias: filenameNoExtension(path),
			...JSON.parse(readFileSync(path)),
		}))
		.filter((data) => data.ids[process.env.STELLAR_NETWORK_PASSPHRASE])
		.map((data) => ({
			alias: data.alias,
			id: data.ids[process.env.STELLAR_NETWORK_PASSPHRASE],
		}));
}

function bind({ alias, id }) {
	exe(
		`${cli} contract bindings typescript --contract-id ${id} --output-dir ${dirname}/packages/${alias} --overwrite`,
	);
	exe(`(cd ${dirname}/packages/${alias} && npm i && npm run build)`);
}

function bindAll() {
	contracts().forEach(bind);
}

function importContract({ alias }) {
	const outputDir = `${dirname}/src/contracts/`;

	mkdirSync(outputDir, { recursive: true });

	const importContent = `
  import * as Client from '${alias}';
  import { rpcUrl } from './util';

  export default new Client.Client({
    ...Client.networks.${process.env.STELLAR_NETWORK},
    rpcUrl,
    ${
			process.env.STELLAR_NETWORK === "local" ||
			process.env.STELLAR_NETWORK === "standalone"
				? "allowHttp: true,"
				: ""
		}
  });
`;

	const outputPath = `${outputDir}/${alias}.ts`;

	writeFileSync(outputPath, importContent);

	console.log(`Created import for ${alias}`);
}

function importAll() {
	contracts().forEach(importContract);
}

// Calling the functions (equivalent to the last part of your bash script)
fundAll();
buildAll();
deployAll();
bindAll();
importAll();
