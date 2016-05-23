'use strict'

const PostHTML = require('posthtml')
const html =
` <div class='js-cool my-class hidden-xs-3 col-xs-4'>
	<p class='js-info col4 text-center custom col-md-10' data-js="some-data date-time">Какой-то текст</p>
  </div>
`
const pattern = /(?:col|js|text|hidden|visible|modal)-(?:xs|sm|md|lg)?(-*\w+)?(-\d)?/i

const plugin = tree => tree
	.match({ attrs: {class: true}}, node =>
	{
        let classes = node.attrs['class'].split(' ')

        let okClasses = classes.filter(cls=>{
            return !pattern.test(cls)
        })
        let jsClasses = classes.map(cls=>{
            if(cls.indexOf('js-')!==-1){
                return cls.replace('js-', '')
            }
        })

		if(okClasses.length) node.attrs['class'] = okClasses.join(' ')
        if(jsClasses.length) node.attrs['data-js'] = jsClasses.join(' ').concat(node.attrs['data-js'] || '')


        return node
	})
PostHTML([plugin])
	.process(html)
	.then(result =>
	{
		console.log(result.html)
	})
    .catch(e => {
        throw e
    })
