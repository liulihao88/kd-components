import { Message } from 'element-ui'
import _ from 'lodash'

export function deepClone(arr) {
  return _.cloneDeep(arr)
}

export function setStorage(str, params, isLocalStorage = false) {
  let handleParams;
  if (typeof params === 'number' || typeof params === 'string') {
    handleParams = params;
  } else {
    handleParams = JSON.stringify(params);
  }
  if (isLocalStorage) {
    localStorage.setItem(str, handleParams);
  } else {
    sessionStorage.setItem(str, handleParams);
  }
}

export function getStorage(data) {
  // 先获取localStorage数据, 如果没有再获取sessionStorage数据。 如果都没有， null;
  let getLocalData = localStorage.getItem(data);
  let getSessionData = sessionStorage.getItem(data);
  if (getLocalData) {
    try {
      if (data !== 'curProject') {
        getLocalData = JSON.parse(getLocalData);
      }
    } catch (e) {
      // console.error(e);
    }
    return getLocalData;
  } else if (getSessionData) {
    try {
      if (data !== 'curProject') {
        getSessionData = JSON.parse(getSessionData);
      }
    } catch (e) {
      // console.error(e);
    }
    return getSessionData;
  }
  return null;
}

export function clearStorage(str) {
  if (!str) {
    sessionStorage.clear();
    localStorage.clear();
    return;
  }
  sessionStorage.removeItem(str);
  localStorage.removeItem(str);
}

/**
 * 格式化时间为年月日时分秒的格式， 格式可以自定义。
 * ① 时间戳10位和13位都可以转换成格式化的日期
 * ② java8格式的日期和有效的日期都可以转换成定义的日期格式
 * @param {Date, string}  都有默认参数
 * @example
 * parseTime() // 2020-07-17 09:53:07
 * parseTime('2018-02-13T06:17') // 2018-02-13 06:17:00
 * parseTime('2020/03/02 06:02') // 2020-03-02 06:02:00
 * parseTime(1541927611000); //2018-11-11 17:13:21
 * parseTime(1541927611000, "{y}年{m}月{d}日 {h}时{m}分{s}秒"); // 2018年11月11日 17时11分31秒
 * parseTime(1541927611, "{y}/{m}/{d} {h}:{m}:{s}"); // 2018/11/11 17:11:31
 * parseTime(new Date()); //2018-11-11 17:13:21
 * parseTime(new Date().getTime()); //2018-11-11 17:13:21
 */

export function parseTime(time = new Date(), cFormat = "{y}-{m}-{d} {h}:{i}:{s}") {
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]; // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

// 全局的提示， 注册到全局 使用方法 $toast('成功提示', 's')
export function $toast(str, type = 's') {
  let handleType = type;
  if (type === 's') {
    handleType = 'success'
  } else if (type === 'i') {
    handleType = 'info'
  } else if (type === 'e') {
    handleType = 'error'
  } else if (type === 'w') {
    handleType = 'warning'
  }
  Message({
    message: str,
    type: handleType,
  })
}

/**
 * @desc 防抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {function(...[*]): *}
 */
export const debounce = (func, wait, immediate) => {
  var timeout, result;
  return function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate && !timeout) {
      result = func.apply(this, args);
    }

    timeout = setTimeout(() => {
      result = func.apply(this, args);
    }, wait)

    return result
  }
}

export function uuid(chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", length = 4) {
  // 如果传的第一个参数的数组， 说明是下拉框。 下拉框获取的是数组的第一项的值
  if (judgeType(chars) === 'array') {
    return chars[0][length === 4 ? 'value' : length]
  }
  let res = ''
  for (let i = length; i > 0; --i) {
    res += chars[Math.floor(Math.random() * chars.length)]
  }
  return res
}

// 获取当前日期前三十天的所有日期
export const getDates = () => {
  var myDate = new Date();
  var nowY = myDate.getFullYear();
  var nowM = myDate.getMonth() + 1;
  var nowD = myDate.getDate();
  var enddate = nowY + "-" + (nowM < 10 ? "0" + nowM : nowM) + "-" + (nowD < 10 ? "0" + nowD : nowD);//当前日期
  //获取三十天前日期
  let dateArr = [enddate]
  for (let i = 1; i < 30; i++) {
    var lw = new Date(myDate - 1000 * 60 * 60 * 24 * i);//最后一个数字30可改，30天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth() + 1;
    var lastD = lw.getDate();
    var startdate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);
    dateArr.unshift(startdate)
  }
  return dateArr
}


/**
 * 判断传入参数的类型
 * @param {*} val
 * judgeType(new RegExp()) regexp
 * judgeType(new Date()) date
 * judgeType([]) array
 * judgeType({}) object
 * judgeType(null) null
 */
export function judgeType(val) {
  if (typeof val === 'object') {
    const objVal = Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
    return objVal;
  } else {
    return typeof val;
  }
}

/**
 * 判断变量是否空值
 * undefined, null, '', '   ', false, 0, [], {} 均返回true，否则返回false
 */
export function isEmpty(v) {
  switch (typeof v) {
    case 'undefined': return true;
    case 'string': if (v.trim().length == 0) return true; break;
    case 'boolean': if (!v) return true; break;
    case 'number': if (0 === v) return true; break;
    case 'object':
      if (null === v) return true;
      if (undefined !== v.length && v.length == 0) return true;
      for (var k in v) { return false; } return true;
  }
  return false;
}

// 子项目中使用 this.$pub.saveStore(this)。 需要传递this。 因为要处理子项目中的store
export function saveStore(_this) {
  //在页面加载时读取sessionStorage里的状态信息
  if (sessionStorage.getItem("store")) {
    // 如果_this.$store.state 和 sessionStorage.getItem("store")的键完全一致。 替换store为storeState和sessionState合并后的值
    if (_sameKeys(_this.$store.state, JSON.parse(sessionStorage.getItem("store")))) {
      _this.$store.replaceState(Object.assign({}, _this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    } else {
      // 否则。 只替换storeState的值， 且将store的sessionStorage替换为storeState
      _this.$store.replaceState(Object.assign({}, _this.$store.state))
      sessionStorage.setItem('store', JSON.stringify(Object.assign({}, _this.$store.state)))
    }
  }
  //在页面刷新时将vuex里的信息保存到sessionStorage里
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("store", JSON.stringify(_this.$store.state))
  })

  // 判断两个对象的 key是否完全一致
  function _sameKeys(org, tar) {
    var o1keys = Object.keys(org);
    var o2keys = Object.keys(tar);
    if (o2keys.length !== o1keys.length) return false;
    for (let i = 0; i <= o1keys.length - 1; i++) {
      let key = o1keys[i]
      if (!o2keys.includes(key)) return false
    }
    return true
  }
}
