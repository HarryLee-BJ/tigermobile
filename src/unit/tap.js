export const slideObj = {
  touch(el, fn) {
    let x0,
      y0,
      res,
      xDiff,
      yDiff

    el.addEventListener('touchstart', function (event) {
      x0 = event.touches[0].clientX
      y0 = event.touches[0].clientY
    })

    el.addEventListener('touchmove', function (event) {
      xDiff = event.touches[0].clientX - x0
      yDiff = event.touches[0].clientY - y0

      if (Math.abs(xDiff) > Math.abs(Math.abs(yDiff))) {
        if (xDiff > 0) {
          res = 'right'
        } else {
          res = 'left'
        }
      } else {
        if (yDiff > 0) {
          res = 'down'
        } else {
          res = 'up'
        }
      }
    })

    el.addEventListener('touchend', function () {
      if (Math.abs(xDiff) < 10 && Math.abs(yDiff) < 10) {
        res = 'tap'
      }
      fn(res)

      xDiff = 0
      yDiff = 0
    })
  }
}
