# 为项目添加格式化校验文件、相关命令及自动安装依赖包

安装内容包含 eslint + prettier + stylelint + yorkie

### 局部安装方式

1. 安装依赖包

   `npm i @sofunny/add-code-format -D`

2. 在 package.json 文件的 script 中添加以下命令

   `"add:formatFile": "sofunny-add-code-format"`

3. 进入项目目录，执行命令

   `npm run add:formatFile`

### 全局安装方式

1. 安装依赖包

   `npm i -g @sofunny/add-code-format`

2. 进入项目根目录，执行命令

   `sofunny-add-code-format`
