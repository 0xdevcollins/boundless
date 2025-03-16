import { execSync } from "child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "path";
import { sync as glob } from "glob";

// Get directory name dynamically
export const dirname = path.dirname(new URL(import.meta.url).pathname);

// Stellar CLI tool alias
export const CLI = "stellar";

// Execute a shell command and log it
export const exe = (command: string): void => {
  console.log(command);
  execSync(command, { stdio: "inherit" });
};

// Remove files matching a glob pattern
export const removeFiles = (pattern: string): void => {
  console.log(`Removing files: ${pattern}`);
  for (const entry of glob(pattern)) {
    rmSync(entry);
  }
};

// Read text from a file
export const readTextFile = (filePath: string): string =>
  readFileSync(filePath, { encoding: "utf8" }).trim();

// Write content to a file
export const writeTextFile = (filePath: string, content: string): void => {
  writeFileSync(filePath, content, "utf8");
};

// Extract filename without extension
export const filenameNoExtension = (filename: string): string => {
  return path.basename(filename, path.extname(filename));
};

// Create directory if it doesn't exist
export const ensureDir = (dirPath: string): void => {
  mkdirSync(dirPath, { recursive: true });
};

// Get deployed contract IDs
export const getContracts = (): { alias: string; id: string }[] => {
  const contractsDir = `./.stellar/contract-ids`;
  const contractFiles = glob(`${contractsDir}/*.json`);
  console.log(contractsDir)

  return contractFiles
    .map((filePath) => ({
      alias: filenameNoExtension(filePath),
      ...JSON.parse(readFileSync(filePath, "utf8")),
    }))
    .filter((data) => data.ids[process.env.STELLAR_NETWORK_PASSPHRASE as string])
    .map((data) => ({
      alias: data.alias,
      id: data.ids[process.env.STELLAR_NETWORK_PASSPHRASE as string],
    }));
};
