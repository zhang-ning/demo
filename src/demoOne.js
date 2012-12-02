/**
 * @namespace demo.one
 */
(function (exports) {
	'use strict';
	/**
	 * @namespace demo.one.add
	 * @function
	 * @author <a href="mailto:nizhang@tibco-support.com">Jonathan</a>
	 * @param {number|object} a 
	 * @param {number|object} b 
	 * @return {number|object}
	 * @description use to sum number or extend object
	 * @example
	 * add(1,2) retrurn 3
	 * add({a:1},{b:2}) return {a:1,b;2} 
	 * @throws {The parameters type is wrong.} If [a and b are not number|object]
	 */
	exports.add = function (a, b) {
		var result, x;
		if (typeof a === 'number' && typeof b === 'number') {
			result = (a + b);
		} else if (typeof a === 'object' && typeof b === 'object') {
			for (x in b) {
				a[x] = b[x];
			}
			result = a;
		} else {
			throw ('The parameters type is wrong.');
		}
		return result;
	};
})(demo.one);