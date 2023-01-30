/**
 * this的指向默认是调用函数的对象
 * 除了call/apply/bind 外，还有两种方式可以对 this的指向不是默认的情况
 * 1.隐式绑定： 调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含。
 * 2。函数由 new 关键字创建
 * 
 * 下面的手写就是通过隐式绑定来实现改变this的指向
 */

Function.prototype.callImitate = function() {
  const [context, ...args] = arguments
  context.fn = this
  let res = context.fn(...args)
  delete context.fn
  return res
}

Function.prototype.applyImitate = function() {
  const [context, args] = arguments
  context.fn = this
  let res = args ? context.fn(...args) : context.fn()
  delete context.fn
  return res
}



let a = 1
let b = 2

let obj = {
  a: 'a',
  b: 'b'
}

function fn() {
  console.log(this.a, ...arguments);
}
fn.callImitate(obj, 1,2,3)
fn.applyImitate(obj, [1,2,3])