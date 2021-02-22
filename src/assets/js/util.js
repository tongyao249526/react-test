let docEl = document.documentElement
export function getSize () { // 获取屏幕的宽度
  function getWdith () {
    let myWidth = 0
    if (typeof (window.innerWidth) === 'number') {
      // Non-IE
      myWidth = window.innerWidth
    } else if (document.documentElement && (document.documentElement.clientWidth)) {
      // IE 6+ in 'standards compliant mode'
      myWidth = document.documentElement.clientWidth
    } else if (document.body && (document.body.clientWidth)) {
      // IE 4 compatible
      myWidth = document.body.clientWidth
    }
    return parseInt(myWidth)
  }
  let screenWidth = window.screen.width > getWdith() ? getWdith() : window.screen.width
  if (screenWidth >= 768) {
    screenWidth = 768
  }
  docEl.style.fontSize = screenWidth / (750 / 40) + 'px'
}
window.addEventListener('resize', () => {
  getSize()
})

// 判断平台
export function isPlatform (str) {
  // 判断安卓还是ios终端
  let u = navigator.userAgent
  let browser = {
    versions: (function () {
      // let app = navigator.appVersion
      return {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      }
    }())
  }
  str = str.toLowerCase()
  if (browser.versions.ios && str === 'ios') {
    return true
  }
  if (browser.versions.android && str === 'android') {
    return true
  }
  if ((u.match(/MicroMessenger/i) && u.match(/MicroMessenger/i)[0].toLowerCase()) === 'MicroMessenger'.toLowerCase() && str === 'micromessenger') {
    return true
  }
  if ((u.match(/isales/i) && u.match(/isales/i)[0].toLowerCase()) === 'isales'.toLowerCase() && str === 'isales') {
    return true
  }
  return false
}

// 与原生交互
export function interactWithApp (name, data) {
  // alert(name+'___'+JSON.stringify(data))
  if (isPlatform('microMessenger')) return
  if (!window.ISALES) {
    window.ISALES = {}
    window.ISALES.ready = function () {}
    let cbName = `${name}_callBack`
    if (data.callBack && typeof data.callBack === 'function') {
      window.ISALES[cbName] = data.callBack
    } else {
      window.ISALES[cbName] = function (e) { console.log(e, 'this mean there is no callback function specified') }
    }
    data.callBackName = `ISALES.${cbName}`
  } else {
    let cbName = `${name}_callBack`
    if (data.callBack && typeof data.callBack === 'function') {
      window.ISALES[cbName] = data.callBack
      delete data.callBack
    } else {
      window.ISALES[cbName] = function (e) { console.log(e, 'this mean there is no callback function specified') }
    }
    data.callBackName = `ISALES.${cbName}`
  }
  if (isPlatform('ios')) {
    try { // ios
      window.webkit.messageHandlers[name].postMessage(JSON.stringify(data))
    } catch (e) {
      // alert(JSON.stringify(e))
    }
  } else if (isPlatform('android')) {
    try { // android
      window.android[name](JSON.stringify(data))
    } catch (e) {
      // console.log(e)
    }
  }
}

export function getPosition (ele) {
  var l = 0
  var t = 0
  while (ele) {
    l += ele.offsetLeft
    t += ele.offsetTop
    ele = ele.offsetParent
  }
  return { left: l, top: t }
}

export function getViewPort () {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  }
}

// 获取地址栏参数
export function getRequest (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var num = +window.location.hash.indexOf('?') + 1
  var r = /param/.test(window.location.hash) ? window.location.search.substr(1).match(reg) : window.location.hash.substr(num).match(reg)
  if (r != null) return decodeURI(r[2])
  return ''
}
// 获取地址栏参数
export function getUrlString (name) {
  var reg = new RegExp('(^|&|\\?)' + name + '=([^&^#]*)(#|&|$)', 'i')
  var r = window.location.href.match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return ''
}
// 隐藏微信分享等功能
export function hideWxMenu () {
  function onBridgeReady () {
    window.WeixinJSBridge.call('hideOptionMenu')
  }

  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}

export function base64 () {
  return {
    decode: window.atob.bind(window),
    encode: window.btoa.bind(window)
  }
}
