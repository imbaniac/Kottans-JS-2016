'use strict';

function* enumerate(iterable) {
	let index = 0;
	for (let iterator of iterable) {
		yield [index++, iterator];
	}
}

const isIterable = object =>
object != null && typeof object[Symbol.iterator] === 'function';

class ExtendedPromise extends Promise {

	static map(input, mapper) {
		return new this((resolve, reject) => {
			this.resolve(input).then(iterable => {
				let pendingPromises = 0;
				let results = [];
				if (!isIterable(iterable)) {
					reject(new TypeError('should be a Promise<Iterable>'));
				}
				for (let iterator of iterable) {
					pendingPromises++;
					this.resolve(iterator).then(iterator => {
						this.resolve(mapper(iterator)).then(value => {
							results.push(value);
							if (!--pendingPromises) {
								resolve(results);
							}
						}, reject);
					}, reject);
				}
			}, reject);
		});
	}

	static some(input, count) {
		return new this((resolve, reject) => {
			this.resolve(input).then(input => {
				let resolved = [];
				let rejected = [];
				for (let promise of input) {
					this.resolve(promise).then(value => {
						if (resolved.length < count) {
							resolved.push(value);
						}
						if (resolved.length == count) {
							resolve(resolved);
						}
					}, error => {
						rejected.push(error);
						if (rejected.length) {
							reject(rejected);
						}
					});
				}
			}, reject);
		});
	}

	static reduce(input, reducer) {
		if (typeof fn !== "function") {
			return;
		}
		return function(val) {
			val = Array.isArray(val) ? val : [val]
			return val.reduce(function(promise, curr) {
				return promise.then(function(prev) {
					return reducer(prev, curr)
				})
			}, Promise.resolve(input))
		}
	}
}

module.exports = ExtendedPromise;
