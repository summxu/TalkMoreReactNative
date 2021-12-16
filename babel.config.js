/*
 * @Author: Chenxu
 * @Date: 2021-12-16 10:12:51
 * @LastEditTime: 2021-12-16 14:46:28
 * @Msg: Nothing
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin',
      ["babel-plugin-root-import", {
        "rootPathSuffix": "./",
        "rootPathPrefix": "@/"
      }]
    ],
  };
};
