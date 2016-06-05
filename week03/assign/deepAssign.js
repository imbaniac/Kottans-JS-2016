'use strict'

const hasProp = Object.prototype.hasOwnProperty,
	propEnum = Object.prototype.propertyIsEnumerable

function assignKey(to, from, key) {
	let val = from[key],
	isObj = typeof val == 'object' || typeof val == 'function'

	if (val === undefined || val === null) return
	if (hasProp.call(to, key) && (to[key] === undefined || to[key] === null)) {
		throw new TypeError(`Cannot convert undefined or null to object ${key}`)
	}
	// Check if obj has nested obj with vals. If not just clone, else recursion
	( !hasProp.call(to, key) || !isObj ) ?
		to[key] = val : to[key] = assign(Object(to[key]), from[key])
}
function assign(to, from) {
	if (to == from) return to
	from = Object(from)
	Reflect.ownKeys(from).forEach(key => {
		if (propEnum.call(from, key))
			assignKey(to, from, key)
		})
	return to
}
function deepAssign(target, ...sources) {
	if (target === null || target === undefined)
		throw new TypeError(`Sources cannot be null or undefined`);
	let to = Object(target)
	sources.forEach(source=>{
		assign(to, source)
	})
	return to
}
module.exports = deepAssign
