/**
 * Created by HarryLee on 2017/7/17.
 */
// 姓名验证
export function checkName(input) {
  const reg = /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/;
  console.log(input, reg.test(input[0].value));
  return reg.test(input[0].value)
}

// 电话验证
export function checkPhone(input) {
  const reg = /^1[3|4|5|7|8][0-9]{9}$/;
  console.log(input, reg.test(input[0].value));
  return reg.test(input[0].value)
}

// 身高验证
export function checkHeight(input) {
  const reg = /^(1[4-9]\d)$/;
  console.log(input, reg.test(input[0].value));
  return reg.test(input[0].value)
}

// 体重验证
export function checkWeight(input) {
  const reg = /^[0-9]{2,3}$/;
  console.log(input, reg.test(input[0].value));
  return reg.test(input[0].value)
}
