/**
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