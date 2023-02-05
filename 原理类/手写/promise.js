const PromiseStatus = {
    RESOLVED: 'resolved',
    PENDING: 'pending',
    REJECT: 'reject'
}


// 初步实现，同步版
class Promise1 {
    constructor(executor) {
        this.status = PromiseStatus.PENDING
        this.value = null
        this.reason = null

        const resolve = (value) => {
            if (this.status === PromiseStatus.PENDING) {
                this.value = value
                this.status = PromiseStatus.RESOLVED
            }
        }

        const reject = (reason) => {
            if (this.status === PromiseStatus.PENDING) {
                this.reason = reason
                this.status = PromiseStatus.REJECT
            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        if (this.status = PromiseStatus.RESOLVED) {
            onFulfilled(this.value)
        }
        if (this.status = PromiseStatus.REJECT) {
            onRejected && onRejected(this.reason)
        }
    }
}

// const p1 = new Promise1((resolve, reject) => {
//     resolve(111)
// })

// p1.then((res) => {
//     console.log("🚀 ~ file: promise.js:48 ~ p.then ~ res", res)
// })


// 处理异步场景
// then 函数中执行结果的可能值类型
// 1-简单类型值；2-promise 对象；3-普通对象或者函数

function resolvePromise(promise, result, resolve, reject) {
    if (promise === result) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    let called = false // 「规范 Promise/A+ 2.3.3.3.3」 如果 then 的返回值 x 是一个 promise，且 x 同时调用 resolve 函数和 reject 函数，则第一次调用优先，其他所有调用被忽略

    if ((typeof result === 'object' && result != null) || typeof result === 'function') {
        try {
            let then = result.then
            if (typeof then === 'function') {
                then.call(
                    result,
                    (y) => {
                        if (called) return
                        called = true

                        resolvePromise(promise, y, resolve, reject)
                    },
                    r => {
                        if (called) return
                        called = true

                        reject(r)
                    }
                )
            } else {
                if (called) return
                called = true

                resolve(result)
            }
        } catch (e) {
            if (called) return
            called = true

            reject(e)
        }
    } else {
        resolve(result)
    }
}
class Promise2 {
    constructor(executor) {
        this.status = PromiseStatus.PENDING
        this.value = null
        this.reason = null
        this.resolveCbs = []
        this.rejectCbs = []

        const resolve = (value) => {
            if (this.status === PromiseStatus.PENDING) {
                this.value = value
                this.status = PromiseStatus.RESOLVED

                this.resolveCbs.forEach(cb => {
                    cb()
                });
            }
        }

        const reject = (reason) => {
            if (this.status === PromiseStatus.PENDING) {
                this.reason = reason
                this.status = PromiseStatus.REJECT

                this.rejectCbs.forEach(cb => {
                    cb()
                });
            }
        }


        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : v => v
        const onRejectedFn = typeof onRejected === 'function' ? onRejected : e => { throw e }

        const promise = new Promise2((resolve, reject) => {
            if (this.status === PromiseStatus.RESOLVED) {
                try {
                    const res = onFulfilledFn(this.value)

                    // resolve(res)

                    // 如果 res 是一个promise，那么就要等到 promise 得到结果之后再 resolve 最终的结果，而不能直接 resolve 这个 promise
                    resolvePromise(promise, res, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }
            if (this.status === PromiseStatus.REJECT) {
                try {
                    const reason = onRejectedFn(this.reason)

                    resolvePromise(promise, reason, resolve, reject)
                } catch (e) {
                    reject(e)
                }

            }

            if (this.status === PromiseStatus.PENDING) {
                this.resolveCbs.push(() => {
                    try {
                        const res = onFulfilledFn(this.value)
                        resolvePromise(promise, res, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })

                this.rejectCbs.push(() => {
                    try {
                        const reason = onRejectedFn(this.reason)

                        resolvePromise(promise, reason, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })

        return promise
    }
}


// const p2 = new Promise2((resolve, reject) => {
//     setTimeout(() => {
//         resolve(222)
//     }, 1000)
// })
// p2.then((res) => {
//     console.log("🚀 ~ file: promise.js:48 ~ p.then ~ res", res)
//     return '222-1'
// }).then(res2 => {
//     console.log("🚀 ~ file: promise.js:105 ~ p1.then ~ res2", res2)
//     return '222-2'
// }).then(res3 => {
//     console.log("🚀 ~ file: promise.js:105 ~ p1.then ~ res3", res3)
// })



// 问题1: then 中返回当前promise 会进入死循环。解决方案： 在 resolvePromise 进行错误抛出。

// 问题2: promise 定义时内部非异步的问题。 解决方案： 给除 executor 外的函数都加上setTimeout 异步
// 下面这段代码的结果会是 1，2 而不是意料中的 2，1
// new Promise2((resolve, reject) => {
//     resolve()
// }).then(() => console.log(1))
// console.log(2)


class Promise {
    constructor(executor) {
        this.status = PromiseStatus.PENDING
        this.value = null
        this.reason = null
        this.resolveCbs = []
        this.rejectCbs = []

        const resolve = (value) => {
            if (this.status === PromiseStatus.PENDING) {
                this.value = value
                this.status = PromiseStatus.RESOLVED

                this.resolveCbs.forEach(cb => {
                    cb()
                });
            }
        }

        const reject = (reason) => {
            if (this.status === PromiseStatus.PENDING) {
                this.reason = reason
                this.status = PromiseStatus.REJECT

                this.rejectCbs.forEach(cb => {
                    cb()
                });
            }
        }


        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        const onFulfilledFn = typeof onFulfilled === 'function' ? onFulfilled : v => v
        const onRejectedFn = typeof onRejected === 'function' ? onRejected : e => { throw e }

        const promise = new Promise2((resolve, reject) => {
            if (this.status === PromiseStatus.RESOLVED) {
                setTimeout(() => {
                    try {
                        const res = onFulfilledFn(this.value)

                        // resolve(res)

                        // 如果 res 是一个promise，那么就要等到 promise 得到结果之后再 resolve 最终的结果，而不能直接 resolve 这个 promise
                        resolvePromise(promise, res, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            }
            if (this.status === PromiseStatus.REJECT) {
                setTimeout(() => {
                    try {
                        const reason = onRejectedFn(this.reason)

                        resolvePromise(promise, reason, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)


            }

            if (this.status === PromiseStatus.PENDING) {
                this.resolveCbs.push(() => {
                    setTimeout(() => {
                        try {
                            const res = onFulfilledFn(this.value)
                            resolvePromise(promise, res, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)

                })

                this.rejectCbs.push(() => {
                    setTimeout(() => {
                        try {
                            const reason = onRejectedFn(this.reason)

                            resolvePromise(promise, reason, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)

                })
            }
        })

        return promise
    }
}


// 下面的代码用 promises-aplus-tests 对 promise 进行测试
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = Promise
