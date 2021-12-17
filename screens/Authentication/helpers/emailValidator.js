/*
 * @Author: Chenxu
 * @Date: 2021-12-17 10:08:34
 * @LastEditTime: 2021-12-17 16:10:14
 * @Msg: Nothing
 */
export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "电子邮箱不能为空."
  if (!re.test(email)) return '这不是一个有效的邮箱格式.'
  return ''
}
