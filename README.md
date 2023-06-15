# mynuxt

## 安装环境
1.安装NodeJS
 去官网下载PKG包安装即可 https://nodejs.org/zh-cn

2.如果版本太高要进行版本降级安装低版本的NodeJS
查看当前版本号
```
node -v
v18.16.0
```

Mac 升级/降级node版本 安装node版本管理模块n
```
sudo npm install n -g
```
使用命令对版本降级/升级 sudo n 版本号
```
sudo n 16.11.0
```
  installing : node-v16.11.0
       mkdir : /usr/local/n/versions/node/16.11.0
       fetch : https://nodejs.org/dist/v16.11.0/node-v16.11.0-darwin-arm64.tar.xz
     copying : node/16.11.0
   installed : v16.11.0 (with npm 8.0.0)
安装完后再看版本
```
node -v
v16.11.0
```




## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
