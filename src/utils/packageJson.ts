const currentPath = process.cwd();
const fs = require("fs");
const packageJson = require(`${currentPath}/package.json`);
const targetPath = process.env.NODE_ENV === "test" ? `${currentPath}/dist` : `${currentPath}`;

/** 处理 package.json 文件，添加必须的依赖 */
const handlePackageJson = () => {
  packageJson["gitHooks"] = {
    ...packageJson["gitHooks"],
    ...{
      "pre-commit": "lint-staged",
    },
  };

  packageJson["lint-staged"] = {
    ...packageJson["lint-staged"],
    ...{
      "*.{js,jsx,less,md,json}": ["prettier --write"],
      "*.ts?(x)": ["prettier --parser=typescript --write", "eslint"],
      "*.{less,css}": ["stylelint --fix"],
    },
  };

  packageJson["scripts"]["lint:style"] = "stylelint --config .stylelintrc.js --fix 'src/**/*.less'";
  packageJson["scripts"]["format:fix"] = "prettier --config .prettierrc --write 'src/services/**/*.ts'";

  packageJson["devDependencies"] = {
    ...packageJson["devDependencies"],
    ...{
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
    },
  };
  fs.writeFileSync(`${targetPath}/package.json`, JSON.stringify(packageJson, null, 2));
};

export { handlePackageJson };
