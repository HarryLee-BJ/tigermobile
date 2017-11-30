/**
 *  数字自增函数
 *
 * in => time => 持续时间 毫秒
 * in => start => 开始值 
 * in => end => 结束值
 * in => callback => 回调函数
 *
 * out => Promise => 完成的变量
 */

export function counterAdd(time, start, end, callback) {
  return new Promise(function (resolve) {
    const numStep = end - start // 加几次
    const timeStep = parseInt(time / numStep)

            ; (function add() {
      let timer = null
      if (start < end) {
        callback(start)
        start++
        timer = setTimeout(function () {
          add()
        }, timeStep)
      } else {
        callback(start)
        clearTimeout(timer)
        resolve('done!')
      }
    })()
  })
}
// export function counterAdd(pos, time, start, end, callback) {
//     return new Promise(function (resolve, reject) {
//         const numStep = end - start, // 加几次
//             timeStep = parseInt(time / numStep) // 一次隔几秒

//             ; (function add() {
//                 let timer = null
//                 if (start < end) {
//                     start++
//                     callback(pos, start)
//                     timer = setTimeout(function () {
//                         add()
//                     }, timeStep)

//                 } else {
//                     clearTimeout(timer)
//                     callback(pos, start)
//                     resolve(pos + '_done!')
//                 }
//             })()
//     })

// }

