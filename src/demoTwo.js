/**
 * @namespace demo.two
 */
(function(exports){
	'use strict';
	/**
	 * @namespace demo.two.isArray
	 * @function
	 * @author <a href="mailto:nizhang@tibco-support.com">Jonathan</a>
	 * @param  {number|object|array}  a 
	 * @return {Boolean} 
	 * @example
	 * isArray(1) return false
	 * isArray('1') return false
	 * isArray({a:1}) return false
	 * isArray([1,2]) return true
	 */
	exports.isArray = function (a) {
		return Object.prototype.toString.call(a) === '[object Array]';
	};
})(demo.two);