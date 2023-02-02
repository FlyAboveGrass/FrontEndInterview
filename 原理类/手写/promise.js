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
            console.log("🚀 ~ file: promise.js:29 ~ PromiseA ~ constructor ~ err", err)
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

const p = new Promise1((resovle, reject) => {
    resovle(111)
})

p.then((res) => {
    console.log("🚀 ~ file: promise.js:48 ~ p.then ~ res", res)
})