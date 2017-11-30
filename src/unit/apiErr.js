// 1：数据库操作失败
// 2：参数不正确
// 3：昵称重复
// 4：此时间段已被占用
// 5：没有绑定微信
// 6：不可操作此数据
// 7：没有关注公众号
// 8：开始时间必须大于结束时间
// 9：此数据不存在
// 10：此用户没有权限
// 11：此数据已存在
// 12: 教练已添加此学员

function errMsg(msg) {
  let str = '';
  msg = parseInt(msg)
  if (msg === 1) {
    str = '数据库操作失败'
  } else if (msg === 2) {
    str = '参数不正确'
  } else if (msg === 3) {
    str = '昵称重复'
  } else if (msg === 4) {
    str = '此时间段已被占用'
  } else if (msg === 5) {
    str = '没有绑定微信'
  } else if (msg === 6) {
    str = '不可操作此数据'
  } else if (msg === 7) {
    str = '没有关注公众号'
  } else if (msg === 8) {
    str = '开始时间必须大于结束时间'
  } else if (msg === 9) {
    str = '此数据不存在'
  } else if (msg === 10) {
    str = '此用户没有权限'
  } else if (msg === 11) {
    str = '此数据已存在'
  } else if (msg === 12) {
    str = '教练已添加此学员'
  } else {
    str = '未知错误'
  }

  return str
}

export default errMsg

