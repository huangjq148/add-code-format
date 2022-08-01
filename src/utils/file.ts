const fs = require("fs");
const path = require("path");

/**
 * 用于判断路径是否存在， 如果不存在，则创建一个
 * @param {string} pathStr 文件路径
 * @returns
 */
function mkdirPath(pathStr: string) {
  if (fs.existsSync(pathStr)) return true;

  let tempDirArray = pathStr.split("/");

  tempDirArray.reduce(
    (dirPath, dirname) => {
      const fullPath: string = dirname ? path.resolve(dirPath, dirname) : "/";
      if (!fs.existsSync(fullPath) && fullPath.indexOf(".") > 0) {
        fs.writeFileSync(fullPath, "{}");
      } else {
        try {
          fs.accessSync(fullPath);
        } catch (e) {
          fs.mkdirSync(fullPath);
        }
      }
      return fullPath;
    },
    pathStr.startsWith("/") ? "/" : path.join(process.cwd()),
  );
}

// module.exports = { mkdirPath };
export { mkdirPath };
