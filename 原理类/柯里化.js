// 函数柯里化
function curry(callback) {
  const _args = []
  const argLength = callback.length
  function fn() {
    _args.push(...arguments)

    if(_args.length === argLength) {
      return callback(..._args)
    } else {
      return fn
    }
  }

  return fn
}




function add(a, b, c) {
  return a + b + c
}

console.log('add', curry(add)(1, 2)(3))