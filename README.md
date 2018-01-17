# 基于vue-cli的多页面脚手架
### 除了拥有原先vue-cli提供的模块打包和vue单文件解析外；主要增加
* 根据页面入口生成多个页面和多个页面chunks
* 自动对项目slice文件夹下的*.png文件自动生成多张雪碧图

## 开发

``` bash
# 安装依赖模块
npm install

# 创建默认模版项目
# 并修改根目录下config/index.js; 设置projectName变量值为新创建的项目名称
node create -n [项目名称]

# 执行开发 localhost:3000
npm run dev

# 执行构建
npm run build

```
