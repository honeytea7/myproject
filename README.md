# myproject
配置工作
语法规则配置
>1. yarn add --dev --exact prettier
>2. echo {}> .prettierrc.json    echo是新建文件的意思，再将文件内容改成{}
>3. 在建一个.pretterignore的文件，内容写成
```

build
coverage
```
>这是一个不需要格式化的文件

>4. npx mrm@2 lint-staged
再把package.json的内容
```
"lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }
```
> 5. yarn add eslint-config-prettier -D
再把package.json的内容
```
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
```

配置mock
> yarn add json-server -D

再把package.json的内容
```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "prepare": "cd .. && husky install superjsonweb/.husky",
   加上这个 "json-server":"json-server __json_server_mock__/db.json --watch"

  },
  配置完的启动命令是npm start json-server
```