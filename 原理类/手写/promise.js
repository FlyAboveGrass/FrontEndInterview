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

function resolvePromise(result, resolve, reject) {
    let called = false
    if ((typeof result === 'object' && result != null) || typeof result === 'function') {
        try {
            let then = result.then
            if (typeof then === 'function') {
                then.call(
                    result,
                    (res) => {
                        if (called) return
                        called = true

                        resolve(res)
                    },
                    reason => {
                        if (called) return
                        called = true

                        reject(reason)
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
        if (called) return
        called = true

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
            reject(error)
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
                    resolvePromise(res, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }
            if (this.status === PromiseStatus.REJECT) {
                try {
                    const reason = onRejectedFn(this.reason)

                    resolvePromise(reason, resolve, reject)
                } catch (e) {
                    reject(e)
                }

            }

            if (this.status === PromiseStatus.PENDING) {
                this.resolveCbs.push(() => {
                    try {
                        const res = onFulfilledFn(this.value)
                        resolvePromise(res, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })

                this.rejectCbs.push(() => {
                    try {
                        const reason = onRejectedFn(this.reason)

                        resolvePromise(reason, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })

        return promise
    }
}


const p2 = new Promise2((resolve, reject) => {
    setTimeout(() => {
        resolve(222)
    }, 1000)
})
p2.then((res) => {
    console.log("🚀 ~ file: promise.js:48 ~ p.then ~ res", res)
    return '222-1'
}).then(res2 => {
    console.log("🚀 ~ file: promise.js:105 ~ p1.then ~ res2", res2)
    return '222-2'
}).then(res3 => {
    console.log("🚀 ~ file: promise.js:105 ~ p1.then ~ res3", res3)
})