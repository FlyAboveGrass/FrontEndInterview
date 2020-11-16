function create() {
    let obj = new Object(); // 创建一个空对象
    let Con = [].shift.call(arguments); // 第一个参数是要创建对象的原型
    obj.__proto__ = Con.prototype; // 把空对象的原型指向第一个参数的原型
    let result = Con.apply(obj, arguments); // 改变this的指向，让this指向新创建的对象
    return typeof(result) === 'object' ? result : obj; // 保证返回值一定是一个object类型
}