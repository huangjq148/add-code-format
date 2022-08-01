(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('path'), require('fs'), require('child_process')) :
    typeof define === 'function' && define.amd ? define(['path', 'fs', 'child_process'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.path$1, global.fs$2, global.child_process));
})(this, (function (path$1, fs$2, child_process) { 'use strict';

    const fs$1 = require("fs");
    const path = require("path");
    /**
     * 用于判断路径是否存在， 如果不存在，则创建一个
     * @param {string} pathStr 文件路径
     * @returns
     */
    function mkdirPath(pathStr) {
        if (fs$1.existsSync(pathStr))
            return true;
        let tempDirArray = pathStr.split("/");
        tempDirArray.reduce((dirPath, dirname) => {
            const fullPath = dirname ? path.resolve(dirPath, dirname) : "/";
            if (!fs$1.existsSync(fullPath) && fullPath.indexOf(".") > 0) {
                fs$1.writeFileSync(fullPath, "{}");
            }
            else {
                try {
                    fs$1.accessSync(fullPath);
                }
                catch (e) {
                    fs$1.mkdirSync(fullPath);
                }
            }
            return fullPath;
        }, pathStr.startsWith("/") ? "/" : path.join(process.cwd()));
    }

    const currentPath$2 = process.cwd();
    const targetPath$2 = process.env.NODE_ENV === "test" ? `${currentPath$2}/dist` : `${currentPath$2}`;
    // 资源文件路径
    let resourcesPath = "";
    if (process.env.NODE_ENV === "test") {
        resourcesPath = path$1.resolve(path$1.resolve(currentPath$2, "../resources"));
    }
    else {
        resourcesPath = path$1.resolve(currentPath$2, "./node_modules/@sofunny/add-code-format/resources");
    }
    const doCopyFile = (to, from) => {
        mkdirPath(to);
        fs$2.writeFileSync(to, fs$2.readFileSync(from));
    };
    const copyFile = (baseFilePath = resourcesPath, baseTargetPath = targetPath$2) => {
        const filenames = fs$2.readdirSync(baseFilePath);
        filenames.map((filename) => {
            const fileFullPath = `${baseFilePath}/${filename}`;
            if (fs$2.statSync(fileFullPath).isDirectory()) {
                copyFile(fileFullPath, `${baseTargetPath}/${filename}`);
            }
            else {
                doCopyFile(`${baseTargetPath}/${filename}`, path$1.resolve(currentPath$2, "..", `${baseFilePath}/${filename}`));
            }
        });
    };

    const currentPath$1 = process.cwd();
    const fs = require("fs");
    const packageJson = require(`${currentPath$1}/package.json`);
    const targetPath$1 = process.env.NODE_ENV === "test" ? `${currentPath$1}/dist` : `${currentPath$1}`;
    /** 处理 package.json 文件，添加必须的依赖 */
    const handlePackageJson = () => {
        packageJson["gitHooks"] = Object.assign(Object.assign({}, packageJson["gitHooks"]), {
            "pre-commit": "lint-staged",
        });
        packageJson["lint-staged"] = Object.assign(Object.assign({}, packageJson["lint-staged"]), {
            "*.{js,jsx,less,md,json}": ["prettier --write"],
            "*.ts?(x)": ["prettier --parser=typescript --write", "eslint"],
            "*.{less,css}": ["stylelint --fix"],
        });
        packageJson["scripts"]["lint:style"] = "stylelint --config .stylelintrc.js --fix 'src/**/*.less'";
        packageJson["scripts"]["format:fix"] = "prettier --config .prettierrc --write 'src/services/**/*.ts'";
        packageJson["devDependencies"] = Object.assign(Object.assign({}, packageJson["devDependencies"]), {
            "cz-customizable": "^6.3.0",
            "@typescript-eslint/eslint-plugin": "^5.27.0",
            "@typescript-eslint/parser": "^5.27.0",
            "cross-env": "^7.0.3",
            eslint: "^7.32.0",
            "eslint-config-prettier": "^8.5.0",
            "eslint-plugin-prettier": "^4.0.0",
            "eslint-plugin-react": "^7.30.0",
            "lint-staged": "^10.0.7",
            "postcss-less": "^6.0.0",
            prettier: "^2.6.2",
            stylelint: "^14.9.1",
            "stylelint-config-prettier": "^9.0.3",
            "stylelint-config-standard": "^26.0.0",
            "stylelint-order": "^5.0.0",
            yorkie: "^2.0.0",
        });
        fs.writeFileSync(`${targetPath$1}/package.json`, JSON.stringify(packageJson, null, 2));
    };

    const currentPath = process.cwd();
    const targetPath = process.env.NODE_ENV === "test" ? `${currentPath}/dist` : `${currentPath}`;
    const workerProcess = child_process.exec(`cd ${targetPath} && npm i`, {});
    const install = () => {
        var _a, _b;
        console.log("开始安装依赖文件");
        if (workerProcess) {
            (_a = workerProcess === null || workerProcess === void 0 ? void 0 : workerProcess.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                console.log(data);
            });
            (_b = workerProcess === null || workerProcess === void 0 ? void 0 : workerProcess.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function (data) {
                console.log(data);
            });
        }
    };

    copyFile();
    handlePackageJson();
    console.log("文件添加成功！ \n");
    console.log("开始安装依赖。。。 \n");
    install();

}));
