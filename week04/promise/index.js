'use strict';

class ExtendedPromise extends Promise {

	static map(input, mapper) {
        return new this((resolve, reject) => {
            this.resolve(input).then(iterable => {
                let pendingPromises = 0;
                let results = [];
                if (!isIterable(iterable)) reject(new TypeError("Promis should be iterable"));
                for (let iterator of iterable) {
                    pendingPromises++;
                    this.resolve(iterator).then(iterator => {
                        this.resolve(mapper(iterator)).then(value => {
                            results.push(value);
                            if (!pendingPromises - 1) resolve(results);
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
						if (resolved.length < count) resolved.push(value);
						if (resolved.length == count) resolve(resolved);
					}, error => {
						rejected.push(error);
						if (rejected.length) reject(rejected);
					});
				}
			}, reject);
		});
	}

	static reduce(input, reducer, initialValue) {
        const isInitialValue = arguments.length > 2;
        let acc;
        return new this((resolve, reject) => {
            this.resolve(initialValue).then(initialValue => {
                this.resolve(input).then(input => {
                    if (!isIterable(input)) {
                        if (!isInitialValue) throw new Error;
						else resolve(initialValue);
                    }
                    let promiseAcc = this.resolve(initialValue);
					let length = 0;
                    input.map((value, id) => {
                        length++;
                        this.resolve(value).then(value => {
                            if (!id && !isInitialValue) {
                                promiseAcc = this.resolve(value);
                                return;
                            }
                            promiseAcc = promiseAcc.then(acc => {
                                return this.resolve(reducer(acc, value, id, length));
                            }, reject);
                            if (id == length	- 1) {
                                promiseAcc.then(resolve, reject);
                            }
                        }, reject);
                    })
                    if (length === 0) resolve(initialValue);
                }, reject);
            }, reject);
        });
    }
}

const isIterable = object =>
	object != null && typeof object[Symbol.iterator] === 'function';

module.exports = ExtendedPromise;
