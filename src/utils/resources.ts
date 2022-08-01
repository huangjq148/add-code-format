import { resolve } from "path";
import { mkdirPath } from "./file";
import { writeFileSync, readFileSync, readdirSync, statSync } from "fs";

const currentPath = process.cwd();
const targetPath = process.env.NODE_ENV === "test" ? `${currentPath}/dist` : `${currentPath}`;

// 资源文件路径
let resourcesPath = "";
if (process.env.NODE_ENV === "test") {
  resourcesPath = resolve(resolve(currentPath, "../resources"));
} else {
  resourcesPath = resolve(currentPath, "./node_modules/@sofunny/add-code-format/resources");
}

const doCopyFile = (to: string, from: string) => {
  mkdirPath(to);
  writeFileSync(to, readFileSync(from));
};

const copyFile = (baseFilePath = resourcesPath, baseTargetPath = targetPath) => {
  const filenames = readdirSync(baseFilePath);
  filenames.map((filename: string) => {
    const fileFullPath = `${baseFilePath}/${filename}`;
    if (statSync(fileFullPath).isDirectory()) {
      copyFile(fileFullPath, `${baseTargetPath}/${filename}`);
    } else {
      doCopyFile(`${baseTargetPath}/${filename}`, resolve(currentPath, "..", `${baseFilePath}/${filename}`));
    }
  });
};

export { copyFile };
