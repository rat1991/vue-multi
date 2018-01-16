
'use strict'
const fs = require('fs')
const path = require('path')
const config = require('../config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')


function getDir(pagePath) {
  return fs.readdirSync(pagePath).filter( file =>{
    return fs.statSync(path.join(pagePath, file)).isDirectory()
  })
}

exports.getEntry = function(param) {
  let flies = getDir(config.src.entryRoot);
  let entries = {};
  flies.forEach(file =>{
    entries[file] = `./src/pages/${file}/index.js`
  });
  return entries
}

exports.getHtmlPlugin = function(param) {
  let flies = getDir(config.src.entryRoot);
  let conf = merge({
    inject: true,
  }, param);
  
  let _arr = [];
  flies.forEach(file =>{
    conf.filename = `html/${file}.html`
    conf.template = `./src/pages/${file}/index.html`
    conf.chunks = process.env.NODE_ENV === 'production' ? ['manifest', 'vendor', file] : ['vendor', file],
    _arr.push(new HtmlWebpackPlugin(conf))
  })
  
  return _arr;
}