/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _minifyImage = __webpack_require__(1);

var _minifyImage2 = _interopRequireDefault(_minifyImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $prev = document.querySelector("#prev");
var $picker = document.querySelector("#picker");

$picker.addEventListener("change", function (event) {
    var file = event.target.files[0];
    (0, _minifyImage2.default)(file, 375).then(function (res) {
        var reader = new FileReader();
        reader.onload = function () {
            var url = reader.result;
            $prev.src = url;
        };
        reader.readAsDataURL(res);
    });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = changeImage;
function changeImage(file, resWidth) {
  //文件，缩小后宽度(px)
  var reader = new FileReader();

  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      var url = reader.result;

      var image = new Image();

      image.onload = function () {

        var x = 0,
            y = 0,
            width = image.width,
            height = image.height;
        var limitW = resWidth;
        if (resWidth >= width) {
          resolve(file);
        }

        var $canvas = document.createElement('canvas');
        $canvas.width = limitW;
        $canvas.height = limitW * height / width;

        if (!$canvas.getContext) {
          resolve(file);
        }
        var ctx = $canvas.getContext('2d');
        ctx.drawImage(image, x, y, width, height, 0, 0, width * (limitW / width), height * (limitW / width));

        var data = $canvas.toDataURL();
        data = data.split(',')[1];
        data = window.atob(data);

        var ia = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i);
        };

        // var blob = new Blob([ia], {type:"image/png"});
        var returnFile = new File([ia], file.name, { type: file.type });
        resolve(returnFile);
      };
      image.onerror = function () {
        resolve(file);
      };

      image.src = url;
    };
    reader.onerror = function () {
      resolve(file);
    };

    try {
      reader.readAsDataURL(file);
    } catch (e) {
      resolve(file);
    }
  });
}

/***/ })
/******/ ]);