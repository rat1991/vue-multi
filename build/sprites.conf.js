
'use strict'
const fs = require('fs')
const path = require('path')
const config = require('../config')
const SpritesmithPlugin = require('webpack-spritesmith');

function assetsPath (_path) {
  const assetsRoot = process.env.NODE_ENV === 'production'
    ? config.build.assetsRoot
    : config.dev.assetsRoot

  return path.posix.join(assetsRoot, 'sprites', _path)
}
function spritesTemplate (data) {
  let torem = function(px){
    var _tmp = px / 75;
    return _tmp + 'rem'
  }
  let _name = /(?=sprites\/).*(?=.png)/.exec(data.sprites[0].image)[0].split('/')[1];
  let prefix = _name === 'sprite' ? '' : `-${_name}`;
  var shared = `[class^="sp${prefix}"], [class*=" sp${prefix}"] {
    display: inline-block;
    background-image: url(${data.sprites[0].image});
    background-repeat:no-repeat;
    background-size: ${torem(data.sprites[0].total_width)}, ${torem(data.sprites[0].total_height)};
  }`;
  var perSprite = data.sprites.map(function (sprite) {
    return `.sp${prefix}-${sprite.name} {
      width: ${torem(sprite.width)};
      height: ${torem(sprite.height)};
      background-position: ${torem(sprite.offset_x)} ${torem(sprite.offset_y)};
    }`;
  }).join('\n');
  return shared + '\n' +perSprite;
};

function readFile (readPath) {
  let _arr = [];
  let files = [];
  try {
    fs.readdirSync(readPath).forEach( file =>{
      if(fs.statSync(path.join(readPath, file)).isDirectory()){
        _arr.push(file)
      }else{
        /\.png$/.test(file) && files.push(file)
      }
    })
    files.length && _arr.unshift(null)
    return _arr
  } catch (e) {
    return _arr
  }
};
function writeFile(text, index) {
  let filePath = path.join(config.dir, 'src/css/sprites/index.scss');
  if(index === 0){
    fs.writeFileSync(filePath, text);
  }else{
    let source = fs.readFileSync(filePath, 'utf8');
    fs.writeFileSync(filePath, source + text);
  }
};

module.exports = function(param){
  // let config = merge({
  //   entry: path.join(config.dir, '/src/slice'),
  //   output: {
  //     image: assetsPath(`${sliceName}.png`),
  //     css: assetsPath(`${sliceName}.scss`)
  //   }
  // }, param);
  let plugins = [];
  let folder = readFile(path.join(config.dir, 'src/slice'));
  folder.forEach((cur, index)=>{
    let slicePath = cur === null ? '' : cur;
    let sliceName = cur === null ? 'sprite' : cur;
    let conf = {
      // 目标小图标
      src: {
          cwd: path.join(config.dir, '/src/slice', slicePath),
          glob: '*.png'
      },
      // 输出雪碧图文件及样式文件
      target: {
          image: assetsPath(`${sliceName}.png`),
          css: [
            [assetsPath(`${sliceName}.css`), {
              format: 'function_based_template'
            }]
          ]
      },
      // 样式文件中调用雪碧图地址写法
      apiOptions: {
          // generateSpriteName(res){},
          cssImageRef: `/sprites/${sliceName}.png`,
      },
      spritesmithOptions: {
          algorithm: 'binary-tree',
          padding: 4
      },
      customTemplates: {
        'function_based_template': spritesTemplate
      }
    };
    // writeFile(`@import "${sliceName}";\n`, index);
    plugins.push(new SpritesmithPlugin(conf))
  })
  return plugins
};
