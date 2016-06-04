'use strict'
const postcss = require('postcss')

module.exports = postcss.plugin("post-css-supports",
    () => css => {
        css.walkAtRules('supports', supports => {
            supports.params = supports.params.replace(/[-\w]+(!?\:)/g, "($&initial)")
        })
    })
