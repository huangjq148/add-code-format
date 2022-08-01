import { exec } from "child_process";

const currentPath = process.cwd();
const targetPath = process.env.NODE_ENV === "test" ? `${currentPath}/dist` : `${currentPath}`;

const workerProcess = exec(`cd ${targetPath} && npm i`, {});

const install = () => {
  console.log("开始安装依赖文件");

  if (workerProcess) {
    workerProcess?.stdout?.on("data", function (data: string) {
      console.log(data);
    });

    workerProcess?.stderr?.on("data", function (data: string) {
      console.log(data);
    });
  }
};

export { install };
