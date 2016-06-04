'use strict'

const PostHTML = require('posthtml')
const html =
`<div class='js-cool js-shit my-class col-xs-4'>
	<p class='js-info col4 text-center custom col-md-10' data-js="some-data date-time">Какой-то текст</p>
	<img src='#' class='pakhavajs-big'/>
</div>`

const pattern = /^(?:col|js|text|hidden|visible|modal)-(?:xs|sm|md|lg)?(-*\w+)?(-\d)?/i

const plugin = tree => tree
	.match({ attrs: {class: true}}, node =>
	{
		const classes = node.attrs['class'].split(' ')
		let jsClasses = classes.map(cls=>{
			if(cls.startsWith('js-')) return cls.replace('js-', '')
		}).filter(cls => cls!=undefined)
		const okClasses = classes.filter(cls => !pattern.test(cls))

		if(okClasses.length) node.attrs['class'] = okClasses.join(' ')
		if(jsClasses.length) {
			if(node.attrs['data-js']) node.attrs['data-js'] = jsClasses.join(' ').concat(' ' + node.attrs['data-js'])
			else node.attrs['data-js'] = jsClasses.join(' ')
		}

		return node
	})
PostHTML([plugin])
	.process(html)
	.then(result =>{
		console.log(result.html)
	})
	.catch(e => {
		throw e
	})
