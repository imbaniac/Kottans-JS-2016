"use strict"

const postcss = require("postcss")
// const {name} = require("./package")
const name = "postcss-blend-with"

module.exports = postcss.plugin(name, () => css =>
{
    css.walkAtRules("blend-with", at =>
    {
        let {params, parent: {nodes}, first: {prop, value}} = at
        let selector = params.slice(1, -1)

        let z = nodes.reduce((index, node) =>
        {
            return node.type == "decl"
                && node.prop == "z-index"
                ? +node.value
                : index
        },  0)

        let decls = nodes.filter(node =>
        {
            if (node.type != "decl") return

            let {prop} = node
            if (prop.startsWith("margin")) return true

            return [ "left", "right", "width" ].includes(prop)
        })

        css.append(`@supports (mix-blend-mode: ${prop})
        {
            ${selector}
            {
                position: relative;
            }
            ${selector}::before,
            ${selector}::after
            {
                content: "";
                position: absolute;
                top: 0;
                height: 100%;
                background: ${value};
                mix-blend-mode: ${prop};
                ${decls.join(";")};
            }
            ${selector}::before
            {
                z-index: ${z + 1};
            }
            ${selector}::after
            {
                z-index: ${z - 1};
            }
        }`)
    })
})
