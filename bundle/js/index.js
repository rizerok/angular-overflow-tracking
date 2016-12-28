/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/bundle/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _module2 = __webpack_require__(6);

	var _module3 = _interopRequireDefault(_module2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _overflowTracking = __webpack_require__(7);

	var _overflowTracking2 = _interopRequireDefault(_overflowTracking);

	var _name = __webpack_require__(9);

	var namespace = _interopRequireWildcard(_name);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module(namespace.moduleName, []).directive(namespace.directiveName, _overflowTracking2.default);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _HtmlOverflowTracking = __webpack_require__(8);

	var _HtmlOverflowTracking2 = _interopRequireDefault(_HtmlOverflowTracking);

	var _name = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function setHot(element, container, addedWord) {
	    //console.log(element);
	    var elementStyle = window.getComputedStyle(element, null);
	    if (elementStyle.getPropertyValue('overflow') !== 'hidden') {
	        element.style.overflow = 'hidden';
	    }
	    if (parseInt(elementStyle.getPropertyValue('height')) === 0) {
	        console.warn('height === 0 for ' + element.className, element);
	    }
	    if (addedWord) {
	        return new _HtmlOverflowTracking2.default(element, container, addedWord);
	    } else {
	        return new _HtmlOverflowTracking2.default(element, container);
	    }
	}
	function getBackground(element) {
	    var bg = getComputedStyle(element, null).getPropertyValue('background-color');
	    if (bg === 'rgba(0, 0, 0, 0)' && element.parentNode) {
	        return getBackground(element.parentNode); //recursive
	    } else {
	        if (element.parentNode) {
	            return bg;
	        } else {
	            console.warn('not define background-image');
	            return 'rgba(255,255,255,1)';
	        }
	    }
	}
	function getLineHeight(element) {
	    var span = document.createElement('span');
	    span.innerHTML = 't'; //test;
	    span.style.display = 'inline-block';
	    element.appendChild(span);
	    var lineHeight = span.getBoundingClientRect().height;
	    element.removeChild(span);
	    return lineHeight;
	}
	function setGradient(element, position, size) {
	    !size || size < 0 && size > 1 ? size = 0.2 : null;
	    position = position || 'hor';
	    //line height
	    var lineHeight = getLineHeight(element);
	    var elementStyle = window.getComputedStyle(element, null);
	    //overflow
	    if (elementStyle.getPropertyValue('overflow') !== 'hidden') {
	        element.style.overflow = 'hidden';
	    }
	    //position
	    if (elementStyle.getPropertyValue('position') === 'static') {
	        element.style.position = 'relative';
	    }
	    //gradient
	    var gradient = document.createElement('div');
	    gradient.className = 'ot-gradient';
	    gradient.style.position = 'absolute';
	    var bg = getBackground(element);
	    console.log(bg);
	    if (position === 'hor') {
	        var bottom = elementStyle.getPropertyValue('padding-bottom');
	        gradient.style.bottom = bottom;
	        gradient.style.right = '0px';
	        gradient.style.height = lineHeight + 'px';
	        gradient.style.width = Math.ceil(element.offsetWidth * size) + 'px';
	        gradient.style.backgroundImage = 'linear-gradient(to left, ' + bg + ' 0%,' + bg + ' 60%,rgba(0,0,0,0) 100%)';
	    } else {
	        //ver
	        gradient.style.bottom = '0px';
	        gradient.style.right = '0px';
	        gradient.style.left = '0px';
	        gradient.style.height = Math.ceil(element.offsetHeight * size) + 'px';
	        gradient.style.backgroundImage = 'linear-gradient(to top, ' + bg + ' 0%,' + bg + ' 60%,rgba(0,0,0,0) 100%)';
	    }
	    element.appendChild(gradient);
	    return {
	        el: gradient,
	        destroy: function destroy() {
	            this.el.parentNode.removeChild(this.el);
	        }
	    };
	}

	exports.default = function () {
	    'ngInject';

	    return {
	        scope: {
	            //hot
	            addedWord: '@',
	            container: '@',
	            resize: '@', //refresh on resize
	            //gradient
	            position: '@',
	            size: '@'
	        },
	        restrict: 'A',
	        controller: function controller($scope, $element, $attrs, $timeout) {
	            $timeout(function () {
	                var mode = $attrs[_name.directiveName];
	                switch (mode) {
	                    case 'html':
	                        //onsole.time('initHot');
	                        var hot;
	                        if ($scope.container) {
	                            hot = setHot($element[0], $element[0].querySelector($scope.container), $scope.addedWord);
	                        } else {
	                            hot = setHot($element[0], $element[0], $scope.addedWord);
	                        }
	                        var timeout;
	                        $scope.resize = +$scope.resize || 0;
	                        var refresh = function refresh() {
	                            clearTimeout(timeout);
	                            timeout = setTimeout(function () {
	                                hot.refresh();
	                            }, $scope.resize);
	                        };
	                        if ($scope.resize) {
	                            window.addEventListener('resize', refresh);
	                        }
	                        //console.timeEnd('initHot');
	                        $scope.$on('$destroy', function () {
	                            hot.destroy();
	                            window.removeEventListener('resize', refresh);
	                        });
	                        break;
	                    case 'gradient':
	                        $scope.position !== 'ver' ? $scope.position = 'hor' : null;
	                        if ($scope.size) {
	                            setGradient($element[0], $scope.position, +$scope.size);
	                        } else {
	                            setGradient($element[0], $scope.position);
	                        }
	                        break;
	                }
	                $element.addClass('is-tracking');
	            });
	        }
	    };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	HtmlOverflowTracking.prototype.deleteLastWord = function (text) {
	    return text.replace(/\s*\S+\s*$/, '');
	};
	HtmlOverflowTracking.prototype.deletingLastWords = function (textNode) {
	    while (this.trackingElem.scrollHeight - this.trackingElem.offsetHeight > 0 && textNode.textContent) {
	        textNode.textContent = this.deleteLastWord(textNode.textContent);
	    }
	    return textNode.textContent;
	};
	HtmlOverflowTracking.prototype.cutTextByLastWord = function (container) {
	    var lastChild = container.lastChild;
	    if (lastChild) {
	        //no empty
	        switch (lastChild.nodeType) {
	            case 1:
	                //element
	                if (lastChild.childNodes.length) {
	                    this.cutTextByLastWord(lastChild); //recursive
	                } else {
	                    //0 => empty tag
	                    lastChild.parentNode.removeChild(lastChild);
	                }
	                break;
	            case 3:
	                //text
	                if (lastChild.textContent.replace(/\s*/, '')) {
	                    var handledText = this.deletingLastWords(lastChild);
	                    if (handledText === '' && container.childNodes.length === 1) {
	                        container.parentNode.removeChild(container);
	                    }
	                } else {
	                    //empty string
	                    lastChild.parentNode.removeChild(lastChild);
	                }
	                break;
	            case 8:
	                //comment
	                lastChild.parentNode.removeChild(lastChild);
	                break;
	        }
	    }
	};
	HtmlOverflowTracking.prototype.cutTextByLastWordStatic = function (container) {
	    var lastChild = container.lastChild;
	    if (lastChild) {
	        //no empty
	        switch (lastChild.nodeType) {
	            case 1:
	                //element
	                if (lastChild.childNodes.length) {
	                    this.cutTextByLastWordStatic(lastChild); //recursive
	                } else {
	                    //0 => empty tag
	                    lastChild.parentNode.removeChild(lastChild);
	                }
	                break;
	            case 3:
	                //text
	                if (lastChild.textContent.replace(/\s*/, '')) {
	                    var handledText = this.deleteLastWord(lastChild.textContent);
	                    lastChild.textContent = handledText;
	                    if (handledText === '' && container.childNodes.length === 1) {
	                        container.parentNode.removeChild(container);
	                    }
	                } else {
	                    //empty string
	                    lastChild.parentNode.removeChild(lastChild);
	                }
	                break;
	            case 8:
	                //comment
	                lastChild.parentNode.removeChild(lastChild);
	                break;
	        }
	    }
	};
	HtmlOverflowTracking.prototype.deleteUnnecessaryHtml = function (trackingElem, container) {
	    //while overflow and no empty container
	    while (trackingElem.scrollHeight - trackingElem.offsetHeight > 0 && container.lastChild) {
	        this.cutTextByLastWord(container);
	    }
	    if (container.lastChild) {
	        trackingElem.classList.remove('is-empty');
	    } else {
	        trackingElem.classList.add('is-empty');
	    }
	};
	HtmlOverflowTracking.prototype.toString = function () {
	    return this.trackingElem.textContent;
	};
	HtmlOverflowTracking.prototype.valueOf = function () {
	    return this.trackingElem.textContent.length;
	};
	HtmlOverflowTracking.prototype.addNode = function (trackingElem, container, addedNode) {
	    //only trackingElem or root container
	    container.appendChild(addedNode);
	    while (trackingElem.scrollHeight - trackingElem.offsetHeight > 0 && container.childNodes.length > 1) {
	        container.removeChild(addedNode);
	        this.cutTextByLastWordStatic(container);
	        container.appendChild(addedNode);
	    }
	    if (trackingElem.scrollHeight - trackingElem.offsetHeight > 0 && container.childNodes.length === 1) {
	        container.removeChild(addedNode);
	    }
	};
	function HtmlOverflowTracking(trackingElem, container, addedWord) {
	    var that = this;
	    this.addedNode = addedWord ? document.createTextNode(' ' + addedWord) : false;
	    container = container || trackingElem;

	    this.originalHtml = container.cloneNode(true);
	    this.trackingElem = trackingElem;
	    this.container = container;

	    this.destroy = function () {
	        //window.removeEventListener('resize',fullHandle);
	        container.innerHTML = '';
	        cloneChildren();
	    };
	    this.refresh = function () {
	        fullHandle();
	    };

	    function handleText() {
	        that.deleteUnnecessaryHtml(trackingElem, container);
	        if (that.addedNode) {
	            that.addNode(trackingElem, container, that.addedNode);
	        }
	    }
	    function fullHandle() {
	        //console.time('eventListenerHot');
	        container.innerHTML = '';
	        cloneChildren();
	        handleText();
	        // console.timeEnd('eventListenerHot');
	    }
	    function cloneChildren() {
	        for (var i = 0; i < that.originalHtml.childNodes.length; i++) {
	            container.appendChild(that.originalHtml.childNodes[i].cloneNode(true));
	        }
	    }
	    handleText();
	    //window.addEventListener('resize',fullHandle);
	}
	var defineParameters = {
	    enumerable: false,
	    configurable: false,
	    writable: false
	};
	for (var key in HtmlOverflowTracking.prototype) {
	    if (typeof HtmlOverflowTracking.prototype[key] === 'function') {
	        Object.defineProperty(HtmlOverflowTracking.prototype, key, defineParameters);
	    }
	}
	exports.default = HtmlOverflowTracking;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var moduleName = exports.moduleName = 'overflow-tracking';
	var directiveName = exports.directiveName = 'overflowTracking';

/***/ }
/******/ ]);