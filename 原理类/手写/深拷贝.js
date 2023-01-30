// 深拷贝
function deepClone(obj, hash = new WeakMap()) {
  const result = Array.isArray(obj) ? [] : {};

  if(hash.get(obj)) { return hash.get(obj); }

  for (let key in obj) {
    if (obj[key] === null || typeof obj[key] !== 'object') {
      result[key] = obj[key]
    } else {
      if(obj.hasOwnProperty(key)) { // 原型链上的属性不继承
        hash.set(obj[key], obj[key])
        result[key] = deepClone(obj[key], hash)
      }
    }
  }
  return result
}


const target = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target;

console.log('deepClone(obj)', deepClone(target))