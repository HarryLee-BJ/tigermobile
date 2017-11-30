(function (width) {
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = () => {
    const winW = document.documentElement.clientWidth;
    if (winW >= width) {
      document.documentElement.style.fontSize = "625%"
    } else {
      document.documentElement.style.fontSize = (winW / width * 625) + "%" //
    }
  }

  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
})(375) // 设计图宽度

