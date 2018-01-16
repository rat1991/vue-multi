"use strict";
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
const yargs = require('yargs')
const extract = require('extract-zip')

let argv = yargs
.alias('n', 'name')
.alias('t', 'tpl')
.argv;

function createProject (param, callback){
  let config = Object.assign({}, param);
  let basePath = config.basePath;
  let projectName = config.projectName;
  let templatesName = config.templatesName;
  const PROJECT_PATH = path.join(__dirname, `${basePath}/${projectName}`);
  const PROJECT_TEMPLATE = path.join(__dirname, config.templatesPath);
  // 判断项目是否存在
  fs.exists(PROJECT_PATH, function (exists) {
      if(exists){
        console.log(chalk.yellow(`  ${projectName}项目已存在, 请更换名称!` + '\n'))
      }else{
        // 创建模版目录
        extract(PROJECT_TEMPLATE, {dir: PROJECT_PATH}, function (err) {
         // extraction is complete. make sure to handle the err
          if(!err){
            console.log(chalk.green(`  创建${projectName}项目成功：${PROJECT_PATH} \n`))
            console.log(chalk.keyword('orange')(
              '请自行修改当前目录下config/index.js \n' +
              `文件中配置[projectName]变量为“${projectName}”后 \n` +
              '执行npm run dev命令进行开发 \n'
            ))
          }else{
            console.log(chalk.red(err + '\n'))
          }
        })
      }
    });
}
createProject({
  basePath: './src',
  templatesPath: 'project_tpl/project.zip',
  projectName: argv.name,
  templatesName: argv.tpl
})