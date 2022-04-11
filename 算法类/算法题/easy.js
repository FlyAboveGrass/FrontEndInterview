// 最长公共前缀
var longestCommonPrefix = function(strs) {
  if(!strs || strs.length < 1) return ''
  if(strs.length === 1) return strs[0]

  let prefix = strs[0]
  for (let i = 1, guard = 0; i < strs.length; i++, guard = 0) {
      
      for(let j = 0; j < strs[i].length; j++) {
          if(prefix[j] === strs[i][j]) {
              guard++
          } else {
              break;
          }
      }
      prefix = prefix.slice(0, guard)

      if (!prefix) return prefix
  }
  return prefix
};

console.log('longestCommonPrefix()', longestCommonPrefix(["flower","flow","flight"]))


// 两数之和
var twoSum = function(nums, target) {
  const map = new Map()
  for(let index = 0; index < nums.length; index ++) {
      if(map.has(nums[index])) {
          return [index, map.get(nums[index])]
      } else {
          map.set(target - nums[index], index)
      }
  }
};
var twoSum2 = function(nums, target) {
  let index1 = -1, index2 = -1
  for(let i = 0, j = i + 1; i < nums.length - 1; i++, j = i +1) {
      while(j < nums.length) {      
          console.log('nums[i] + nums[j] ', nums[i], nums[j] )
            
          if(nums[i] + nums[j] === target) {
              index1 = i
              index2 = j
              break;
          }
          j ++
      }
      if(index1 > -1 && index2 > -1) break
  }
  return [index1, index2]
};
// console.log(twoSum([3,2,4], 6))



// 奇偶排列问题
var exchange = function(nums) {
  let i = 0, j = nums.length -1
  while(i < j) {
    if(nums[j] % 2 === 1 && nums[i] % 2 === 0) {
      let temp = nums[i]
      nums[i] = nums[j]
      nums[j] = temp

      i ++
      j --
      continue
    }
    if(nums[i] % 2 === 1) {
        i ++
    }
    if(nums[j] % 2 === 0) {
        j --
    }
    console.log('🚀----  --> exchange  --> nums', nums, i, j)
  }
  return nums
};

// console.log(exchange([1,2,3,4]))


// 青蛙跳台阶问题
var numWays = function(n) {
  let res = 0
  let count2 = Math.floor(n / 2)
  let count1 = n - count2 * 2
  while(count2) {
    res += count2
  }

  function mul(n, m) {
    return m === 0 ? n * mul(n-1, m-1) : 1
  }
};

function mul(n, m) {
  return m >= 0 ? n * mul(n-1, m-1) : 1
}
// console.log(mul(4,1))



// 旋转数组的最小数字
var minArray = function(numbers) {
  let a = 0,b = numbers.length -1
  let p = Math.floor(numbers.length / 2)
  for(;a + 1 < b;){
      if(numbers[p] < numbers[b]) {
          b = p
      } else if(numbers[p] > numbers[a]) {
          a = p
      }
      p = a + Math.floor((b - a) / 2)
  }
  return numbers[b]
};
var minArray2 = function(numbers) {
  let a = 0,b = numbers.length -1
    let p = null
    while(a < b){
        p = a + Math.floor((b - a) / 2)
        if(numbers[p] < numbers[b]) {
            b = p
        } else if(numbers[p] > numbers[b]) {
            a = p + 1
        } else {
            b --
        }
        
    }
    return numbers[b]
};

//特殊例子:  [1]  [1,2]  [10,10,10, 1, 10]
// console.log(minArray2([3,1]))





// 斐波那契数列

// 简单递归，容易堆栈溢出
var fib = function(n) {
  if(n < 2) return n
  return fib(n-1) + fib(n-2)
};

// 动态规划法
var fib = function(n) {
  if(n < 2) return n
  let o = 0, p = 1, q = 1
  for(let i = 2; i < n; i ++) {
    o = p
    p = q
    q = o + p
    if(q > 1000000007) q = q % 1000000007
  }
  return q
};

// console.log(fib(7))












// 反转链表，数组输出
var reversePrint = function(head) {
  if(!head) return []
  let arr = []
  for(;true;) {
      arr.unshift(head.val)
      if(!head.next) {
          break
      }
  }
  return arr
};

console.log()








// 替换空格
var replaceSpace = function(s) {
  let reg = /\s/g
  return s.replace(reg, '%20')
};
var replaceSpace2 = function(s) {
  let len = s.length
  let count = 0
  for(let i = 0; i < len; i++){
      if(s[i] === ' ') count ++
  }
  let arr = s.split('').concat([])
  arr.length = arr.length + count * 2
  console.log('🚀----  --> replaceSpace2  --> arr', arr)
  for(let a = len - 1,b = arr.length - 1; a > 0; a--, b--) {
      if(arr[a] === ' ') {
          arr[b--] = '0'
          arr[b--] = '2'
          arr[b] = '%'
      } else {
          arr[b] = arr[a]
      }
      console.log('')
  }
  return arr.join('')
};

// console.log(replaceSpace2('we we'))






















// 寻找重复数字
// var findRepeatNumber = function(nums) {
//   let set = new Set()
//   for(let num of nums) {
//       console.log('🚀----  --> findRepeatNumber  --> num', num)
//       const curSize = set.size
//       set.add(num)
//       if(set.size === curSize) {
//           return num
//       }
//   }
// };

var findRepeatNumber = function(nums) {
  nums.sort()
  console.log('🚀----  --> findRepeatNumber  --> nums', nums)
  for(let i = 0; i < nums.length;  i++) {
      console.log('🚀----  --> findRepeatNumber  --> i', i, nums[i], nums[i+1])
      if(nums[i] === nums[i + 1]) return nums[i]
  }
};

// console.log(findRepeatNumber([1,1,2,3]))
