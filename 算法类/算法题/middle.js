// 顺时针打印二维数组
var spiralOrder = function(matrix) {
  const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  const w = matrix[0].length, h = matrix.length
  let p = 0
  let res = []
  for(let k = 0, i = 0, j = 0; k < w * h; k ++) {
      res.push(matrix[i][j])
      if(
          i + direction[p][0] > h - 1 || j + direction[p][1] > w - 1 || j + direction[p][1] < 0
          || matrix[i + direction[p][0]][j + direction[p][1]] === '/'
          
      ) {
          p = (p + 1) % 4
      }
      matrix[i][j] = '/'
      i += direction[p][0]
      j += direction[p][1]
  }
  return res
};


console.log('spiralOrder', spiralOrder(
  [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12]
  ]
))


// 二维数组查找数字
var findNumberIn2DArray = function(matrix, target) {
  if(!matrix.length) return false
  let x = matrix.length - 1, y = 0
  while(x >= 0 && y < matrix[0].length) {
      console.log('🚀----  --> findNumberIn2DArray  --> length', matrix[x][y])
    
      if(matrix[x][y] > target) {
          x--
      } else if(matrix[x][y] < target) {
          y++
      } else {
          return true
      }
  }
  return false
};

let arr = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [10, 11, 12]
]
let arr2 = [[-5]]
// console.log(findNumberIn2DArray(arr2, -5))
