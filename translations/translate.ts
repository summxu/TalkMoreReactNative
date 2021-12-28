/*
 * @Author: Chenxu
 * @Date: 2021-12-28 09:48:25
 * @LastEditTime: 2021-12-28 10:35:33
 * @Msg: Nothing
 */
import i18n from "i18n-js";
import memoize from "lodash.memoize";

export const t = memoize(
  (key, config?) => i18n.t(key, config),
  (key, config?) => (config ? key + JSON.stringify(config) : key),
);