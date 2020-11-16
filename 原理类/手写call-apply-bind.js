Function.prototype.myCall = function(context){
    if(typeof this !== 'function'){
        console.log('type error')
        return 
    }
    let result=null,args = [...arguments].slice(1)
    context = context||window
    context.fn = this
    result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function(context){
    if(typeof this !== 'function'){
        console.log('type error')
        return 
    }
    let result = null
    context = context||window
    context.fn = this
    if(arguments[1]){
        result = context.fn(...arguments[1])
    }else{
        result = context.fn()
    }
    delete context.fn
    return result
}

Function.prototype.myBind = function(context){
    if(typeof this !== 'function'){
        console.log('type error')
        return 
    }
    let fn = this,
        args = [...arguments].slice(1)
    context = context||window
    return function(){
        return fn.apply(context,args.concat(...arguments))
    }
}


let x ={
    a:1,
    b:[1,2,3]
}
let y ={
    a:3,
    b:[4,5,6],
    c:function(){
        console.log(this.a)
        console.log(this.b)
        console.log([...arguments])
    }
}
// log('未绑定')
// y.c(1,2,3,5)
// log('call绑定')
// y.c.myCall(x,1,2,3,5)
// log('apply绑定')
// y.c.myApply(x,[1,2,3,4,9])
// log('bind绑定')
// y.c.myBind(x,1,2,3)(4,5,6)