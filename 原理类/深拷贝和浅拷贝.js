/**
 * 浅拷贝
 * 创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 。
 * 所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
 * 
 * 深拷贝
 * 将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
 */

// 浅拷贝的方法
// 1、 Object.assign
// 2、 拓展运算符
// 3、 Array.prototype.slice
// 4、 Array.prototype.concat

let o = {
    a:{
        b:1
    },
    k:2
}
let oo = {
    a:{
        b:1
    },
    k:2,
    x: void 0,
    arr:[1,2,4,7,{a:'qqq'}],
    fn: function(){
        console.log(111)
    }
}
let o2 = {},o3 = {}

// o2 = Object.assign(o2,o)
// o2 = {...o}
// o2 = ([o].slice())[0]
//  o2 = ([].concat(o))[0]


// log(JSON.stringify(o2))
// o2.a.b = 2
// log(JSON.stringify(o))

//深拷贝
// 1、 JSON.parse(JSON.stringify(obj)):undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略
// 2、自实现

o3 = JSON.parse(JSON.stringify(oo))

function deepClone(obj){
    let obj2 = {}
    for(let key in obj){
        if(obj[key] === 'object'){
            obj2[key] = deepClone(obj[key])
        }else{
            obj2[key] = obj[key]
        }
    }
    return obj2
}
//o3 = deepClone(oo)


// log(JSON.stringify(o3))
// o3.a.b = 2
// log(JSON.stringify(oo))
// log(JSON.stringify(o3))