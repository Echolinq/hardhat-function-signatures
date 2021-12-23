import "@nomiclabs/hardhat-ethers";
import * as fs from "fs";
import { task } from "hardhat/config";
import path from "path";

task(
  "function-signatures",
  "Get function signatures for Contracts",
  async (taskArgs, hre) => {
    const contractLocation = hre.config.paths.sources;
    const files = getFiles(
      path.join(hre.config.paths.artifacts, path.basename(contractLocation))
    );
    const source = path.basename(hre.config.paths.sources);
    for (const file of files) {
      const abiPath = path.join(hre.config.paths.artifacts, source, file);
      const iface = new hre.ethers.utils.Interface(
        JSON.parse(fs.readFileSync(abiPath, "utf8")).abi
      );
      const funcSigs = [];
      for (const key in iface.functions) {
        const sigHash = iface.getSighash(key);
        funcSigs.push({
          [path.basename(file)]: key,
          Signature: sigHash,
        });
      }
      console.table(funcSigs);
    }
  }
);

const getFiles = (filePath: fs.PathLike) => {
  const files = [];
  for (const file of fs.readdirSync(filePath)) {
    const fullPath = filePath + "/" + file;
    if (fs.lstatSync(fullPath).isDirectory()) {
      getFiles(fullPath).forEach((x) => files.push(file + "/" + x));
    } else {
      files.push(file);
    }
  }
  return files.filter((file) => {
    return !path.basename(file).toLowerCase().endsWith(".dbg.json");
  });
};
