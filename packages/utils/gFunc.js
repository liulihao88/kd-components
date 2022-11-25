import { Message } from 'element-ui';
import _ from 'lodash';

// 全局的提示， 注册到全局 使用方法 $toast('成功提示', 's')
export function $toast(str, type = 's', otherParams = {}) {
  let handleType = type;
  if (type === 's') {
    handleType = 'success';
  } else if (type === 'i') {
    handleType = 'info';
  } else if (type === 'e') {
    handleType = 'error';
  } else if (type === 'w') {
    handleType = 'warning';
  }
  Message({
    message: str,
    type: handleType,
    ...otherParams,
  });
}

export function deepClone(arr) {
  return _.cloneDeep(arr);
}

/**
 * 生成随机数, 第一个参数可传字符串, 空 或者数组
 * uuid("名字") => 名字hc8f
 * uuid() => abcd
 * uuid('time') => 25MR 10-27 17:34:01
 * uuid('time', 0, {startStr:'andy', timeStr:"{h}:{i}:{s}"}) => andy 17:38:23
 * uuid('phone') => 13603312460
 * uuid('email') => cBZA@qq.com
 * uuid('number') => 2319
 * uuid([ { label: "小泽泽", value: "xzz" },{ label: "小月月", value: "xyy" }]) => xzz
 */
export function uuid(
  type = '',
  length = 4,
  { emailStr = '@qq.com', timeStr = '{m}-{d} {h}:{i}:{s}', startStr = '' } = {}
) {
  let randomStr = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let res = type;
  // 如果传的第一个参数的数组， 说明是下拉框。 下拉框获取的是数组的第一项的值
  if (judgeType(type) === 'array') {
    return type[0][length === 4 ? 'value' : length];
  }
  // 如果是手机号, 生成随机手机号
  if (type === 'phone') {
    let prefixArray = new Array('130', '131', '132', '133', '135', '136', '137', '138', '170', '187', '189');
    let i = parseInt(10 * Math.random());
    let res = prefixArray[i];
    for (var j = 0; j < 8; j++) {
      res = res + Math.floor(Math.random() * 10);
    }
    return res;
  }
  // 如果是email, 生成随机email
  if (type === 'email') {
    return uuid(startStr, length) + emailStr;
  }
  // 如果是时间, 生成时间字符串
  if (type === 'time') {
    return uuid(startStr, length) + ' ' + parseTime(new Date(), timeStr);
  }
  // 如果是数字, 生成除了0的随机数字
  if (type === 'number') {
    let randomStr = '123456789';
    let res = '';
    for (let i = length; i > 0; --i) {
      res += randomStr[Math.floor(Math.random() * randomStr.length)];
    }
    return Number(res);
  }
  for (let i = length; i > 0; --i) {
    res += randomStr[Math.floor(Math.random() * randomStr.length)];
  }
  return res;
}

/**
 * 判断传入参数的类型
 * @param {*} type
 * judgeType(new RegExp()) regexp
 * judgeType(new Date()) date
 * judgeType([]) array
 * judgeType({}) object
 * judgeType(null) null
 * judgeType(123) number
 */
export function judgeType(type) {
  if (typeof type === 'object') {
    const objType = Object.prototype.toString.call(type).slice(8, -1).toLowerCase();
    return objType;
  } else {
    return typeof type;
  }
}

/**
 * 判断变量是否空值
 * undefined, null, '', '   ', false, 0, [], {} 均返回true，否则返回false
 */
export function isEmpty(v) {
  switch (typeof v) {
    case 'undefined':
      return true;
    case 'string':
      if (v.trim().length === 0) return true;
      break;
    case 'boolean':
      if (!v) return true;
      break;
    case 'number':
      if (0 === v) return true;
      break;
    case 'object':
      if (null === v) return true;
      if (undefined !== v.length && v.length === 0) return true;
      for (var k in v) {
        return false;
      }
      return true;
  }
  return false;
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

export function parseTime(time = new Date(), cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]; // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
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
      if (typeof JSON.parse(getLocalData) !== 'number') {
        getLocalData = JSON.parse(getLocalData);
      }
    } catch (e) {
      console.log(e);
    }
    return getLocalData;
  } else if (getSessionData) {
    try {
      if (typeof JSON.parse(getSessionData) !== 'number') {
        getSessionData = JSON.parse(getSessionData);
      }
    } catch (e) {
      console.log(e);
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
 * @desc 防抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {function(...[*]): *}
 */
export const debounce = (func, wait, immediate) => {
  var timeout, result;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate && !timeout) {
      result = func.apply(this, args);
    }

    timeout = setTimeout(() => {
      result = func.apply(this, args);
    }, wait);

    return result;
  };
};

// 获取当前日期前三十天的所有日期
export const getDates = () => {
  var myDate = new Date();
  var nowY = myDate.getFullYear();
  var nowM = myDate.getMonth() + 1;
  var nowD = myDate.getDate();
  var enddate = nowY + '-' + (nowM < 10 ? '0' + nowM : nowM) + '-' + (nowD < 10 ? '0' + nowD : nowD); //当前日期
  //获取三十天前日期
  let dateArr = [enddate];
  for (let i = 1; i < 30; i++) {
    var lw = new Date(myDate - 1000 * 60 * 60 * 24 * i); //最后一个数字30可改，30天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth() + 1;
    var lastD = lw.getDate();
    var startdate = lastY + '-' + (lastM < 10 ? '0' + lastM : lastM) + '-' + (lastD < 10 ? '0' + lastD : lastD);
    dateArr.unshift(startdate);
  }
  return dateArr;
};

//多表单验证
export const checkForm = (formName, self) => {
  // console.log(formName)
  return new Promise((resolve, reject) => {
    self.$refs[formName].validate((valid) => {
      if (valid) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

/**
 * 表单验证方法的封装. 主要不必再写逻辑判断和统一失败提示语
 * @param {*} _this vue文件传递的this
 * @param {*} ref form的ref名字
 * @param {*} sucCb 验证成功的回调
 * @example
 * this.$pub.validateForm(this, ()=>{})
 * this.$pub.validateForm(this, ()=>{}, 'form2Ref')
 */
export function validateForm(_this, sucCb, ref = 'formRef') {
  _this.$refs[ref].validate((valid) => {
    if (valid) {
      sucCb();
    } else {
      return $toast('验证未通过', 'e');
    }
  });
}

/**
 * 返回一个promise的睡眠函数
 */
export function sleep(time = 0) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
