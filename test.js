var p = new Promise(resolve => {
  var p1 = new Promise(resolve => {
    resolve(1);
  });
  console.log('p1', p1);
  resolve(p1);
  console.log('🚀----  --> resolve(p1);')
});

console.log('p1 out', p);

p.then(res => {
  console.log('🚀----  --> res', res)
})

console.log('p2 out ', p);