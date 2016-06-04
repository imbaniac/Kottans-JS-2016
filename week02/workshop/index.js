'use strict'

const postcss = require('postcss')
const fs= require('fs')
const plugin = require('./plugin')
const css = fs.readFileSync('./style.css')

postcss().use(plugin)
    .process(css)
    .then(res=>{
        fs.writeFileSync('./style-before.css', res.css)
        console.log(res.css)
    }).catch(console.error)
