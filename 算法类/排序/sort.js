let arr = [10,8 ,12, 1, 78, 21,0]
// console.log(bubbleSort(arr))
console.log(insertSort(arr))


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
function insertSort(array) {
    let arr = array
    let tempArr = arr.slice(0,1)
    if(!arr){
        throw new Error('参数必须是数组')
    }
    for(let i = 1; i < arr.length; i++) {
        for(let j = 0;j < tempArr.length; j++) {
            if(arr[i] <= tempArr[j] ){
                tempArr.splice(j, 0, arr[i])
                break
            }
            if(arr[i] > tempArr.slice(-1)) {
                tempArr.push(arr[i])
                break
            }
        }
    }
    return tempArr
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