/**
 * @type {Object}
 * @namespace demo
 * @property {object} [one] [demoOne.js]
 * @property {object} [two] [demoTwo.js]
 * @property {object} [three] [demoThree.js]
 */
var demo = {
	one: {},
	two: {},
	three: {}
};/**
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
})(demo.one);/**
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
})(demo.two);/**
 * @namespace demo.three
 */
(function (exports) {
	'use strict';
	/**
	 * person
	 * @namespace demo.three.person
	 * @class
	 * @author <a href="nizhang@tibco-support.com">Jonathan</a>
	 * @param  {String} name [name]
	 */
	exports.person = function (name) {
		this.name = name;
	};

	var methord = exports.person.fn = exports.person.prototype;

	/**
	 * @namespace demo.three.person.getName
	 * @author <a href="nizhang@tibco-support.com">Jonathan</a>
	 * @method
	 * @protected
	 * @return {String} [name]
	 * @example
	 * new person('pa').getName() return 'pa'
	 */
	methord.getName = function () {
		return this.name;
	};

	/**
	 * @namespace demo.three.person.setName
	 * @author <a href="nizhang@tibco-support.com">Jonathan</a>
	 * @method
	 * @protected
	 * @param {String} name [name]
	 * @return {object} [this]
	 * @example
	 * new person('pa').setName('seven').getName() return 'seven'
	 */
	methord.setName = function (name) {
		this.name = name;
		return this;
	};
}).call(this, demo.three);