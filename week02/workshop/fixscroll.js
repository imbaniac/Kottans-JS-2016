"use strict"

const postcss = require("postcss")
const name = "postcss-short-supports"

module.exports = postcss.plugin(name, options => css =>
{
    css.walkDecls("background-attachment", decl =>
    {
        if (decl.value != "fixed") return
        let {except = /.^/} = options || {}
        let {parent} = decl
        let {selector} = parent
        if(except.test(selector)) return
        let hasPosition = parent.some(node =>
        {
            if (node.type != "decl") return
            if (node.prop != "position") return
            if (node.value != "static") return true
        })

        if (!hasPosition)
        {
            parent.append({ prop: "position", value: "relative" })
        }

        let zIndex = parent.some(node =>
        {
            return node.type == "decl"
                && node.prop == "z-index"
        })

        if (!zIndex)
        {
            parent.append({ prop: "z-index", value: 0 })
        }

        let overflow = parent.nodes.find(node =>
        {
            return node.type == "decl"
                && node.prop == "overflow"
        })

        if (overflow) overflow.value = "hidden"
        else parent.append({ prop: "overflow", value: "hidden" })

        parent.append({ prop: "background-size", value: "0 0" })
        decl.remove()


        css.append
        (`
            ${selector}::before
            {
                content: "";
                position: fixed;
                z-index: -1;
                will-change: transform;

                top: 0; left: 0;
                width: 100%; height: 100%;
                background-image: inherit;
            }
        `)
    })
})
