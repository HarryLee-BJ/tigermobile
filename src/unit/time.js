// 时间处理  原始 2017-06-07 17:08:42

// 处理为
// 1 当天 几分钟前(后)  几小时前(后)
// 2 当周 几天前(后)
// 3 其他 几月几号

export const timeFilter = (time) => {
  const timeArr = time.split(' ')
  const day = timeArr[0]

  const now = new Date().getTime()
  const that = new Date(time).getTime()

  const DAYM = 86400000
  const HOURM = 3600000
  const MIN = 60000

  let resTime = null

  const str = now - that > 0 ? '前' : '后'

  const diffTime = Math.abs(now - that)

  if (diffTime <= HOURM) {
    resTime = `${(diffTime / MIN).toFixed(0)} 分钟${str}`
  } else if (diffTime <= DAYM) {
    resTime = `${(diffTime / HOURM).toFixed(0)} 小时${str}`
  } else if (diffTime <= (DAYM * 7)) {
    resTime = `${(diffTime / DAYM).toFixed(0)} 天${str}`
  } else {
    resTime = day
  }

  return resTime
}
