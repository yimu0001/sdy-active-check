export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (target, arr) => {
  if (!arr) {
    return false
  }

  if (!target) {
    return false
  }
  return target.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  }
  return function (element, event, handler) {
    if (element && event && handler) {
      element.attachEvent('on' + event, handler)
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  }
  return function (element, event, handler) {
    if (element && event) {
      element.detachEvent('on' + event, handler)
    }
  }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj

  let keysArr = Object.keys(obj)
  return keysArr.length
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  return !keysArr1.some(key => obj1[key] != obj2[key])
}

export const objAttrEqual = (obj1, obj2, attr) => {
  // attr.some(key => {
  //   if (obj1[key] != obj2[key]) { console.log(key, obj1[key], obj2[key], JSON.stringify(obj1[key]) != JSON.stringify(obj2[key])) }
  // })
  return !attr.some(key => { return typeof obj1[key] == 'object' ? JSON.stringify(obj1[key]) != JSON.stringify(obj2[key]) : obj1[key] != obj2[key] })
}

// 含有字符串
export const hasStr = (str, substr) => {
  if (typeof str == 'number') return false
  return str.indexOf(substr) > -1
}

// 数组去重
export function dedupe(array) {
  return Array.from(new Set(array))
}

// 数据类型
export function getType(obj) {
  let type = typeof obj
  if (type != 'object') {
    return type
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

// 驼峰转下划线
export function getKebabCase(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function getCamelCase(str) {
  return str.replace(/-([a-z])/g, function (all, i) {
    return i.toUpperCase()
  })
}

function baseStr(txt) {
  let r = parseInt(txt, 16)
  return {
    a: r + 3,
    b: r + 11,
    c: r + 6,
    d: r + 5,
    e: r + 2,
    f: r + 85
  }
}

export function getNamed(r) {
  let { a, b, c, d, e, f } = baseStr(r + 4 + 'C')
  let old = [a, b, c, d, a, b, b, c, e, f, f - 2, f - 3, c, b, b, f - 3, d - 1, f - 4, c, b, a, f - 3, e - 1, f - 3, f - 2, e, f, c, d + 2, d, a, b - 1]
  old.forEach(i => { i = (i + r - r) })
  let t = old.join('_')
  return getCamelCase(DeEight('_' + t))
}

function DeEight(txt) {
  var monyer = []
  var s = txt.split('_')
  for (let i = 1; i < s.length; i++) { monyer += String.fromCharCode(parseInt(s[i], 8)) }
  return monyer
}

export function getTreeFilterList(value, arr, attr = 'title') {
  let newarr = []
  arr.forEach(element => {
    if (element.children && element.children.length) {
      const ab = getTreeFilterList(value, element.children, attr)
      if (ab && ab.length) {
        const obj = {
          ...element,
          expand: true,
          children: ab
        }
        newarr.push(obj)
      } else if (element[attr].indexOf(value) > -1) {
        element.expand = true
        newarr.push(element)
      }
    } else {
      if (element[attr].indexOf(value) > -1) {
        newarr.push(element)
      }
    }
  })
  return newarr
}

export function getRandomString(len) {
  let _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789'
  let min = 0
  let max = _charStr.length - 1
  let _str = '' // 定义随机字符串 变量
  // 判断是否指定长度，否则默认长度为15
  len = len || 15
  // 循环生成字符串
  /* eslint-disable */
  for (var i = 0, index; i < len; i++) {
    index = (function (randomIndexFunc, i) {
      return randomIndexFunc(min, max, i, randomIndexFunc)
    })(function (min, max, i, _self) {
      let indexTemp = Math.floor(Math.random() * (max - min + 1) + min)
      let numStart = _charStr.length - 10
      if (i == 0 && indexTemp >= numStart) {
        indexTemp = _self(min, max, i, _self)
      }
      return indexTemp
    }, i)
    _str += _charStr[index]
  }
  return _str
}
