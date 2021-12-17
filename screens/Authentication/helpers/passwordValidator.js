/*
 * @Author: Chenxu
 * @Date: 2021-12-17 10:08:34
 * @LastEditTime: 2021-12-17 16:11:01
 * @Msg: Nothing
 */
export function passwordValidator(password) {
  if (!password) return "密码不能为空."
  if (password.length < 5) return '密码必须在5个字符长度以上.'
  return ''
}
