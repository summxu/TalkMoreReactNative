/*
 * @Author: Chenxu
 * @Date: 2020-04-13 14:36:50
 * @LastEditTime: 2020-04-13 14:54:52
 */
const fs = require("fs");

try {
  console.log("React native fetch debugger fix...");
  var rootDir = process.cwd();

  var file = `${rootDir}/node_modules/react-native/Libraries/Utilities/PolyfillFunctions.js`;
  var data = fs.readFileSync(file, "utf8");

  var dataFix =
    `
  defineLazyObjectProperty(object, name, {
    get: getValue,
    enumerable: enumerable !== false,
    writable: writable !== false,
  });

  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
  global.FormData = global.originalFormData
    ? global.originalFormData
    : global.FormData;

  fetch; // Ensure to get the lazy property

  if (window.__FETCH_SUPPORT__) {
    // it's RNDebugger only to have
    window.__FETCH_SUPPORT__.blob = false;
  } else {
    /*
     * Set __FETCH_SUPPORT__ to false is just work for fetch.
     * If you're using another way you can just use the native Blob and remove the else  statement
     */
    global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
    global.FileReader = global.originalFileReader
      ? global.originalFileReader
      : global.FileReader;
  }
    `

  if (data.indexOf(dataFix) !== -1) {
    throw "> Already fixed";
  }

  var result = data.replace(
    `  defineLazyObjectProperty(object, name, {
    get: getValue,
    enumerable: enumerable !== false,
    writable: writable !== false,
  });`,
    dataFix,
  );
  fs.writeFileSync(file, result, "utf8");
  console.log("> Done");
} catch (error) {
  console.error(error);
}