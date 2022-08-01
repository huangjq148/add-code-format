import { copyFile } from "./utils/resources";
import { handlePackageJson } from "./utils/packageJson";
import { install } from "./utils/dependencies";

copyFile();
handlePackageJson();

console.log("文件添加成功！ \n");
console.log("开始安装依赖。。。 \n");

install();
