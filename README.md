# 基于vue-cli的多页面脚手架
### 除了拥有原先vue-cli提供的模块打包和vue单文件解析外；主要增加
* 根据页面入口生成多个页面和多个页面chunks
    *  页面入口为当前项目 demo\src\pages 路径下，每个页面根据文件夹划分；
    *  每个入口文件夹则分别有：index.html（生成页面模版）、index.js（模块入口）、App.vue（vue入口组件）
* 自动对项目slice文件夹下的*.png文件自动生成多张雪碧图

## 项目文件结构
*  pages 放置页面入口
*  style 放置 css、sass样式文件
*  components 放置当前项目组件
* assets 放置图片、音频、视频等文件
*  slice 放置雪碧图切片

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
