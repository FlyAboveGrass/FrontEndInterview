function colorState() {
	const state = {
		default: 'red',
		blue: 'blue',
		yellow: 'yellow'
	}
	let _color = 'default'
	
	function changeColor(color) {
		_color = color
	}
	function show() {
		return state[_color]
	}
	return {
		changeColor,
		show
	}
}

let colorFn = colorState()
console.log('🚀----  --> colorFn', colorFn.show())
colorFn.changeColor('blue')
console.log('🚀----  --> colorFn2', colorFn.show())
















// console.log('1');
// setTimeout(function () {
//   console.log('2');
//   process.nextTick(function () {
//     console.log('3');
//   })
//   new Promise(function (resolve) {
//     console.log('4');
//     resolve();
//   }).then(function () {
//     console.log('5')
//   })
// })

// process.nextTick(function () {
//   console.log('6');
// })

// new Promise(function (resolve) {
//   console.log('7');
//   resolve();
// }).then(function () {
//   console.log('8')
// })

// setTimeout(function () {
//   console.log('9');
//   process.nextTick(function () {
//     console.log('10');
//   })
//   new Promise(function (resolve) {
//     console.log('11');
//     resolve();
//   }).then(function () {
//     console.log('12')
//   })
// })


// // 1 7 6 8 2 4 9 11 3 10 5  12