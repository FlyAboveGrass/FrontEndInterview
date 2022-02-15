let arr = [10,8, 2 ,12, 1, 1, 78, 79, 21,0]
// console.log(bubbleSort(arr))
console.log(quickSort2(arr))


// 冒泡排序
function bubbleSort(array) {
    let arr = array
    if(!arr){
        throw new Error('参数必须是数组')
    }
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1;j < arr.length; j++) {
            if(arr[i] > arr[j]) {
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

// 插入排序
// function insertSort(array) {
//   if(!array){
//     throw new Error('参数必须是数组')
//   }
//     let arr = array
//     let tempArr = arr.slice(0,1)
//     for(let i = 1; i < arr.length; i++) {
//         for(let j = 0;j < tempArr.length; j++) {
//             if(arr[i] <= tempArr[j] ){
//                 tempArr.splice(j, 0, arr[i])
//                 break
//             }
//             if(arr[i] > tempArr.slice(-1)) {
//                 tempArr.push(arr[i])
//                 break
//             }
//         }
//     }
//     return tempArr
// }
function insertSort(array) {
  if(!array) return array
  let arr = JSON.parse(JSON.stringify(array))

  for(let i = 1; i < arr.length; i ++) {
    let temp = arr[i]
    for(let j = i-1; j >= 0; j--) {
      if(temp < arr[j]) {
        arr[j+1] = arr[j]
      } else {
        arr[j+1] = temp
        break
      }
      
      if(j === 0) {
        arr[j] = temp
      }
    }
  }
  return arr
}

// 选择排序
function selectSrot(array) {
    let arr = array
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1;j < arr.length; j++) {
            if(arr[i] > arr[j]) {
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }
}

// 快速排序
// 1. 考虑1-2个的情况
// 2. 考虑 边缘值为最值的情况
// 3. 考虑 left === right 的情况
function quickSort(array) { // 这种方法虽然简单，但是浪费了很多的空间
  if(!array) return array
  let arr = JSON.parse(JSON.stringify(array))

  if (arr.length === 1 || arr.length === 0) return arr

  let temp = arr[0], left = [], right = []

  for(let i = 1; i < arr.length; i ++) {
    arr[i] < temp ? left.push(arr[i]) : right.push(arr[i])
  }
  return quickSort(left).concat(temp).concat(quickSort(right))
}

function quickSort2(array) {
  if(!array) return array
  let arr = JSON.parse(JSON.stringify(array))

  if (arr.length === 1 || arr.length === 0) return arr
  if(arr.length === 2) {
    if(arr[0] > arr[1]) {
      return arr.reverse()
    }
    return arr
  }

  let left = 1, right = arr.length - 1
  let temp = arr[0]

  while (left <= right) {
    for (let i = left; i < arr.length; i++) {
      if(i === arr.length -1) left = arr.length
      if(arr[i] > temp) {
        left = i
        break
      }
    }
    for (let j = right; j > 0; j --) {
      if(j === 1) right = 0
      if(arr[j] <= temp) {
        right = j
        break
      }
    }
    if (left < right) { // 利用异或进行交换，可以节省一个变量的空间
      arr[left] = arr[left] ^ arr[right]
      arr[right] = arr[left] ^ arr[right]
      arr[left] = arr[right] ^ arr[left]

      left ++
      right --
    }
  }
  
  // right 一定小于或者等于基准
  // left 一定大于基准
  return quickSort2(arr.slice(1, right + 1)).concat(temp).concat(quickSort2(arr.slice(left)))
}
